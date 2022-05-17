import { IRepo } from './types';

type ReposEntryProps = Omit<IRepo, 'id'>;

export default function ReposEntry({
  name,
  description,
  htmlUrl,
}: ReposEntryProps) {
  return (
    <div className="c-repo">
      <a
        className="c-repo__name-link"
        href={htmlUrl}
        target="_blank"
        rel="noreferrer"
      >
        {name}
      </a>
      <span className="c-repo__description">{description}</span>
    </div>
  );
}
