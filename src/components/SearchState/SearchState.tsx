import React from 'react';
import searchIconPath from './assets/search_icon.svg';
import userIconPath from './assets/user_icon.svg';

type SearchStateProps = {
  searchState?: 'Initial state' | 'Loading' | 'User not found' | 'Error';
  children?: React.ReactNode;
};

export default function SearchState({
  searchState,
  children,
}: SearchStateProps) {
  switch (searchState) {
    case 'Initial state':
      return (
        <Base>
          <img
            className="c-search-state__img"
            src={searchIconPath}
            alt=""
          ></img>
          <span className="c-search-state__message">
            Start with searching a GitHub user
          </span>
        </Base>
      );
    case 'Loading':
      return <Base>loading spinner</Base>;
    case 'User not found':
      return (
        <Base>
          <img
            className="c-search-state__img"
            src={userIconPath}
            alt=""
          ></img>
          <span className="c-search-state__message">User not found</span>
        </Base>
      );
    case 'Error':
      /* For handling everything that's not 404 so that the app doesn't break */
      return (
        <Base>
          <span className="c-search-state__message">
            Something went wrong
          </span>
        </Base>
      );
    default:
      return <Base>{children}</Base>;
  }
}

function Base({ children }: { children?: React.ReactNode }) {
  return <div className="c-search-state">{children}</div>;
}
