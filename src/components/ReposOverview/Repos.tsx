import { IRepo } from './types';
import ReposEntry from './ReposEntry';

type ReposProps = {
  repos: IRepo[];
  totalReposCount: number;
};

export default function Repos({ repos, totalReposCount }: ReposProps) {
  return (
    <div className="c-repos">
      <h1 className="c-repos__title">Repositories ({totalReposCount})</h1>
      {repos.map((repo) => {
        return (
          <ReposEntry
            name={repo.name}
            description={repo.description}
            htmlUrl={repo.htmlUrl}
            key={repo.id}
          />
        );
      })}
    </div>
  );
}
