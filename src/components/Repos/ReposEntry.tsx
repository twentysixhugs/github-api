import { IRepo } from './types';

type ReposEntryProps = IRepo;

export default function ReposEntry({
  name,
  description,
  htmlUrl,
}: ReposEntryProps) {
  return (
    <div className="c-repo">
      <a href={htmlUrl} className="c-repo__name-link">
        {name}
      </a>
      <span className="c-repo__description">{description}</span>
    </div>
  );
}
