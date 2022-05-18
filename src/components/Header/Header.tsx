import Search from './Search';

import githubIcon from './assets/github_icon.svg';
import './Header.css';

type HeaderProps = {
  onSearch: (query: string) => void;
};

export default function Header({ onSearch }: HeaderProps) {
  return (
    <header className="c-header">
      <img
        className="c-header__github-logo"
        src={githubIcon}
        alt="github logo"
      ></img>
      <Search onSearch={onSearch} />
    </header>
  );
}
