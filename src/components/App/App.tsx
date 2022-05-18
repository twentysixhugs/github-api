import React, { useEffect, useState } from 'react';
import Header from '../Header';
import { IRepo } from '../ReposOverview/types';
import ReposOverview from '../ReposOverview';
import UserInfo from '../UserInfo';
import SearchResult from '../SearchResult';

function App() {
  const [searchQuery, setSearchQuery] = useState<null | string>(null);

  type UserData = {
    ['name']: string;
    ['login']: string;
    ['html_url']: string;
    ['avatar_url']: string;
    ['followers']: number;
    ['following']: number;
    [key: string]: string | number | boolean;
  } | null;

  type ReposData = {
    ['name']: string;
    ['description']: string;
    ['html_url']: string;
    ['id']: number;
    [key: string]: string | number | boolean;
  };

  const [userData, setUserData] = useState<UserData>(null);
  const [reposData, setReposData] = useState<ReposData[] | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isNotFound, setIsNotFound] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (isError || isNotFound) {
      setUserData(null);
      setReposData(null);
    }
  }, [isError, isNotFound]);

  useEffect(() => {
    const fetchData = async (
      fetchUrl: string,
      callback:
        | React.Dispatch<React.SetStateAction<UserData>>
        | React.Dispatch<React.SetStateAction<ReposData>>,
    ): Promise<boolean> => {
      try {
        const res = await fetch(fetchUrl);

        if (!res.ok) {
          if (res.status === 404) {
            setIsNotFound(true);
          } else {
            setIsError(true);
          }

          return false;
        }

        const data = await res.json();

        callback(data);
      } catch (err) {
        setIsError(true);
        return false;
      }
      return true;
    };

    if (searchQuery) {
      setIsLoading(true);
      const loadedRepos: any = [];

      Promise.all([
        fetchData(
          `https://api.github.com/users/${searchQuery}`,
          setUserData,
        ),
        (async () => {
          /* Fetch all repos page by page until we get them all.
            They will be stored in loadedRepos */
          let fetchCount = 1;

          while (fetchCount) {
            console.log('while loop');
            const isFetchSuccessful = await fetchData(
              `https://api.github.com/users/${searchQuery}/repos?per_page=100&page=${fetchCount}`,
              (data: any) => {
                // if there are no repos remaining
                if (data.length === 0) {
                  // we can't break the loop from a closured callback,
                  // so after fetchCount++ it'll be 0 and the loop will stop
                  fetchCount = -1;
                } else {
                  loadedRepos.push(...data);
                }
              },
            );

            if (isFetchSuccessful) {
              fetchCount++;
            } else {
              fetchCount = 0;
            }
          }
        })(),
      ]).then(() => {
        setSearchQuery(null);
        setIsLoading(false);
        setReposData([...loadedRepos]);
      });
    }
  }, [searchQuery]);

  const handleSearch = (query: string) => {
    setIsNotFound(false);
    setSearchQuery(query);
  };

  let viewToRender;

  if (isNotFound) {
    viewToRender = <SearchResult searchState="User not found" />;
  } else if (isError) {
    // If it's not 404 (so that the app doesn't break)
    viewToRender = <SearchResult searchState="Error" />;
  } else if (isLoading) {
    viewToRender = <SearchResult searchState="Loading" />;
  } else if (!(userData && reposData)) {
    // If it's not loading, but there's no data
    viewToRender = <SearchResult searchState="Initial state" />;
  } else if (userData && reposData) {
    // If there are no errors, it's not loading and the data is available
    viewToRender = (
      <SearchResult>
        <UserInfo
          name={userData['name']}
          login={userData['login']}
          htmlUrl={userData['html_url']}
          avatarUrl={userData['avatar_url']}
          followersCount={userData['followers']}
          followingCount={userData['following']}
        />
        <ReposOverview
          allRepos={reposData.map((repo) => {
            const repoDataToRender: IRepo = {
              name: repo['name'],
              description: repo['description'],
              htmlUrl: repo['html_url'],
              id: repo['id'],
            };

            return repoDataToRender;
          })}
        />
      </SearchResult>
    );
  }

  return (
    <>
      <Header onSearch={handleSearch} />
      {viewToRender}
    </>
  );
}

export default App;
