import Search from './Search';

type HeaderProps = {
  onSearch: (query: string) => void;
};

export default function Header({ onSearch }: HeaderProps) {
  return (
    <header className="c-header">
      <img
        className="c-header__github-logo"
        src="/"
        alt="github logo"
      ></img>
      <Search onSearch={onSearch} />
    </header>
  );
}
