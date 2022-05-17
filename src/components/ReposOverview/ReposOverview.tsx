import Repos from '../Repos/Repos';
import { IRepo } from '../Repos/types';

type ReposOverviewProps = {
  allRepos: IRepo[];
};

export default function ReposOverview({ allRepos }: ReposOverviewProps) {
  // TODO: it should pass the determined number of items
  return (
    <div className="c-repos-overview">
      <Repos repos={allRepos} />
    </div>
  );
}
