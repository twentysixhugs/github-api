import React from 'react';
import Loader from './Loader';
import searchIconPath from './assets/search_icon.svg';
import userIconPath from './assets/user_icon.svg';
import './SearchState.css';

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
        <Base classNameModifier="initial">
          <div className="c-search-state__wrapper">
            <img
              className="c-search-state__img"
              src={searchIconPath}
              alt=""
            ></img>
            <span className="c-search-state__message">
              Start with searching a GitHub user
            </span>
          </div>
        </Base>
      );
    case 'Loading':
      return (
        <Base classNameModifier="loading">
          <Loader />
        </Base>
      );
    case 'User not found':
      return (
        <Base classNameModifier="user-not-found">
          <div className="c-search-state__wrapper">
            <img
              className="c-search-state__img"
              src={userIconPath}
              alt=""
            ></img>
            <span className="c-search-state__message">User not found</span>
          </div>
        </Base>
      );
    case 'Error':
      /* For handling everything that's not 404 so that the app doesn't break */
      return (
        <Base classNameModifier="error">
          <div className="c-search-state__wrapper">
            <span className="c-search-state__message">
              Something went wrong
            </span>
          </div>
        </Base>
      );
    default:
      return <Base>{children}</Base>;
  }
}

function Base({
  children,
  classNameModifier,
}: {
  children?: React.ReactNode;
  classNameModifier?: string;
}) {
  return (
    <div className={`c-search-state c-search-state--${classNameModifier}`}>
      {children}
    </div>
  );
}
