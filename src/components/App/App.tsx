import React, { useEffect, useState } from 'react';
import Header from '../Header';
import { IRepo } from '../ReposOverview/types';
import ReposOverview from '../ReposOverview';
import UserInfo from '../UserInfo';
import SearchState from '../SearchState';

function App() {
  const [searchQuery, setSearchQuery] = useState<null | string>(null);

  type UserData = {
    [key: string]: string | number | boolean;
  } | null;

  type ReposData = Array<{
    [key: string]: string | number | boolean;
  }> | null;

  const [userData, setUserData] = useState<UserData>(null);
  const [reposData, setReposData] = useState<ReposData>(null);

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
    ) => {
      try {
        const res = await fetch(fetchUrl);

        if (!res.ok && res.status === 404) {
          setIsNotFound(true);
          return;
        }

        const data = await res.json();

        callback(data);
      } catch (err) {
        setIsError(true);
      }
    };

    if (searchQuery) {
      setIsLoading(true);

      Promise.all([
        fetchData(
          `https://api.github.com/users/${searchQuery}`,
          setUserData,
        ),
        fetchData(
          `https://api.github.com/users/${searchQuery}/repos`,
          setReposData,
        ),
      ]).then(() => {
        setSearchQuery(null);
        setIsLoading(false);
      });
    }
  }, [searchQuery]);

  const handleSearch = (query: string) => {
    setIsNotFound(false);
    setSearchQuery(query);
  };

  let viewToRender;

  if (isNotFound) {
    viewToRender = <SearchState searchState="User not found" />;
  } else if (isError) {
    // If it's not 404 (so that the app doesn't break)
    viewToRender = <SearchState searchState="Error" />;
  } else if (isLoading) {
    viewToRender = <SearchState searchState="Loading" />;
  } else if (!(userData && reposData)) {
    // If it's not loading, but there's no data
    viewToRender = <SearchState searchState="Initial state" />;
  } else if (userData && reposData) {
    // If there are no errors, it's not loading and the data is available
    viewToRender = (
      <SearchState>
        <UserInfo
          name={userData['name'] as string}
          login={userData['login'] as string}
          htmlUrl={userData['html_url'] as string}
          avatarUrl={userData['avatar_url'] as string}
          followersCount={userData['followers'] as number}
          followingCount={userData['following'] as number}
        />
        <ReposOverview
          allRepos={reposData.map((repo: any) => {
            const repoDataToRender: IRepo = {
              name: repo['name'],
              description: repo['description'],
              htmlUrl: repo['html_url'],
              id: repo['id'],
            };

            return repoDataToRender;
          })}
        />
      </SearchState>
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
