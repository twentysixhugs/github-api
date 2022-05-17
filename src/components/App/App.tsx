import React, { useEffect, useState } from 'react';
import Header from '../Header';
import { IRepo } from '../Repos/types';
import ReposOverview from '../ReposOverview';
import UserInfo from '../UserInfo';

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
  const [isNotFound, setIsNotFound] = useState(false);
  const [isError, setIsError] = useState(false);

  const [isDataLoaded, setIsDataLoaded] = useState(false);

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
      setIsDataLoaded(false);

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
        setIsDataLoaded(true);
      });
    }
  }, [searchQuery]);

  const handleSearch = (query: string) => {
    setIsNotFound(false);
    setSearchQuery(query);
  };

  let viewToRender;

  if (isNotFound) {
    viewToRender = 'not found';
  } else if (isError) {
    viewToRender = 'Something went wrong, please try again';
  } else if (!userData && !reposData) {
    viewToRender = 'initial screen';
  } else if (!isDataLoaded) {
    viewToRender = 'loading screen';
  } else if (userData && reposData) {
    console.log(userData, reposData);
    viewToRender = (
      <>
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
      </>
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
