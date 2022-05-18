import Search from './Search';
import searchIconSmall from './assets/search_icon_small.svg';

type HeaderProps = {
  onSearch: (query: string) => void;
};

export default function Header({ onSearch }: HeaderProps) {
  return (
    <header className="c-header">
      <img
        className="c-header__github-logo"
        src={searchIconSmall}
        alt="github logo"
      ></img>
      <Search onSearch={onSearch} />
    </header>
  );
}
