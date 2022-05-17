type StatsProps = {
  followersCount: number;
  followingCount: number;
};

export default function Stats({
  followersCount,
  followingCount,
}: StatsProps) {
  const formatNumber = (num: number): string => {
    /* if the number is less than 1000, e.g. 453, it'll return it.
    if it's 68215, it'll return 68.2k,
    i.e. with 'k' and rounded to 1 decimal point */
    return num >= 1000
      ? `${Math.round((num / 1000) * 10) / 10}k`
      : `${num}`;
  };

  return (
    <div className="c-stats">
      <div className="c-stats__wrapper">
        <img className="c-stats__img" alt=""></img>
        <span className="c-stats__stats-data">
          {`${formatNumber(followersCount)} ${
            followersCount !== 1 ? 'followers' : 'follower'
          }`}
        </span>
      </div>
      <div className="c-stats__wrapper">
        <img className="c-stats__img" alt=""></img>
        <span className="c-stats__stats-data">
          {`${formatNumber(followingCount)} following`}
        </span>
      </div>
    </div>
  );
}
