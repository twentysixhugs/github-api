import { IRepo } from './types';

type ReposEntryProps = Omit<IRepo, 'id'>;

export default function ReposEntry({
  name,
  description,
  htmlUrl,
}: ReposEntryProps) {
  return (
    <div className="c-repos-entry">
      <a
        className="c-repos-entry__name-link"
        href={htmlUrl}
        target="_blank"
        rel="noreferrer"
      >
        {name}
      </a>
      <span className="c-repos-entry__description">{description}</span>
    </div>
  );
}
