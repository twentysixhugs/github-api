import React, { useState } from 'react';

type SearchProps = {
  onSearch: (query: string) => void;
};

export default function Search({ onSearch }: SearchProps) {
  const [query, setQuery] = useState('');

  const handleSubmit: React.FormEventHandler = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form className="c-search" onSubmit={handleSubmit}>
      <input
        className="c-search__input"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        name="query"
      ></input>
    </form>
  );
}
