import Stats from './Stats';
import './UserInfo.css';

type UserInfoProps = {
  followersCount: number;
  followingCount: number;
  name: string;
  login: string;
  htmlUrl: string;
  avatarUrl: string;
};

export default function UserInfo({
  name,
  login,
  avatarUrl,
  htmlUrl,
  followersCount,
  followingCount,
}: UserInfoProps) {
  return (
    <div className="c-user-info">
      <img
        className="c-user-info__avatar"
        src={avatarUrl}
        alt="User avatar"
      ></img>
      <h2 className="c-user-info__name">{name}</h2>
      <a
        className="c-user-info__login"
        href={htmlUrl}
        target="_blank"
        rel="noreferrer"
      >
        {login}
      </a>
      <Stats
        followersCount={followersCount}
        followingCount={followingCount}
      />
    </div>
  );
}
