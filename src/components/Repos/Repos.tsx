import { IRepo } from './types/types';
import ReposEntry from './ReposEntry';

type ReposProps = {
  repos: IRepo[];
};

export default function Repos({ repos }: ReposProps) {
  return (
    <div className="c-repos">
      <h1 className="c-repos__title">Repositories</h1>
      {repos.map((repo) => {
        return (
          <ReposEntry
            name={repo.name}
            description={repo.description}
            htmlUrl={repo.htmlUrl}
          />
        );
      })}
    </div>
  );
}
