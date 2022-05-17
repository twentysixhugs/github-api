import { IRepo } from './types';
import ReposEntry from './ReposEntry';

type ReposProps = {
  repos: IRepo[];
};

export default function Repos({ repos }: ReposProps) {
  let viewToRender;

  if (repos.length > 0) {
    viewToRender = (
      <>
        <h1 className="c-repos__title">Repositories</h1>
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
      </>
    );
  } else {
    viewToRender = (
      <>
        <img src="" alt=""></img>
        <span className="c-repos__message-empty">
          Repository list is empty
        </span>
      </>
    );
  }

  return <div className="c-repos">{viewToRender}</div>;
}
