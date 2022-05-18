import React, { useState } from 'react';
import searchIconSmall from './assets/search_icon_small.svg';

type SearchProps = {
  onSearch: (query: string) => void;
};

export default function Search({ onSearch }: SearchProps) {
  const [query, setQuery] = useState('');

  const handleSubmit: React.FormEventHandler = (e) => {
    e.preventDefault();

    if (query) {
      onSearch(query);
    }
  };

  return (
    <form className="c-search" onSubmit={handleSubmit}>
      <img className="c-search__icon" src={searchIconSmall} alt=""></img>
      <input
        className="c-search__input"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        name="query"
        autoComplete="off"
        placeholder="Enter GitHub username"
      ></input>
    </form>
  );
}
