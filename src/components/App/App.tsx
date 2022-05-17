import { useEffect, useState } from 'react';
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

  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch(
          `https://api.github.com/users/${searchQuery}`,
        );
        const data = await res.json();

        setUserData(data);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchReposData = async () => {
      try {
        const res = await fetch(
          `https://api.github.com/users/${searchQuery}/repos`,
        );
        const data = await res.json();

        setReposData(data);
      } catch (err) {
        console.log(err);
      }
    };

    if (searchQuery) {
      setIsDataLoaded(false);

      Promise.all([fetchUserData(), fetchReposData()]).then(() => {
        setSearchQuery(null);
        setIsDataLoaded(true);
      });
    }
  }, [searchQuery]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  let viewToRender;

  if (!userData && !reposData) {
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
