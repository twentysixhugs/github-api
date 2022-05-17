import Stats from './Stats';

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
      <span className="c-user-info__name">{name}</span>
      <a className="c-user-info__login" href={htmlUrl}>
        {login}
      </a>
      <Stats
        followersCount={followersCount}
        followingCount={followingCount}
      />
    </div>
  );
}
