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
    ['public_repos']: number;
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

  const fetchData = async (
    fetchUrl: string,
    callback:
      | React.Dispatch<React.SetStateAction<UserData>>
      | React.Dispatch<React.SetStateAction<ReposData[] | null>>,
  ) => {
    try {
      const res = await fetch(fetchUrl);

      if (!res.ok) {
        if (res.status === 404) {
          setIsNotFound(true);
        } else {
          setIsError(true);
        }
      }

      const data = await res.json();

      callback(data);
      console.log(data);
    } catch (err) {
      setIsError(true);
    }
  };

  const handleSearch = (query: string) => {
    setIsNotFound(false);
    setSearchQuery(query);
    setIsLoading(true);

    Promise.all([
      fetchData(`https://api.github.com/users/${query}`, setUserData),
      fetchData(
        `https://api.github.com/users/${query}/repos?per_page=4&page=1&sort=updated`,
        setReposData,
      ),
    ]).then(() => {
      setIsLoading(false);
    });
  };

  const handlePageChange = (selectedPage: number) => {
    fetchData(
      `https://api.github.com/users/${searchQuery}/repos?per_page=4&page=${
        selectedPage + 1
      }&sort=updated`,
      setReposData,
    );
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
          currentRepos={reposData.map((repo) => {
            const repoDataToRender: IRepo = {
              name: repo['name'],
              description: repo['description'],
              htmlUrl: repo['html_url'],
              id: repo['id'],
            };

            return repoDataToRender;
          })}
          onPageChange={handlePageChange}
          allReposLength={userData['public_repos']}
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
