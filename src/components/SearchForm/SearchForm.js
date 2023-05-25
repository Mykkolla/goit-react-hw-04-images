import { useState } from 'react';
import '../../styles.css';

export default function SearchFrom({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSearchInput = e => {
    const { value } = e.target;
    setQuery(value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (!query) return;

    onSearch(query);

    resetForm();
  };

  const resetForm = () => {
    setQuery('');
  };

  return (
    <form className="SearchForm" onSubmit={handleSubmit}>
      <button className="SearchForm-button" type="submit">
        <span className="SearchForm-button-label">Search</span>
      </button>

      <input
        className="SearchForm-input"
        type="text"
        name="query"
        value={query}
        onChange={handleSearchInput}
        autoComplete="off"
        autoFocus
        placeholder="Search images and photos"
      />
    </form>
  );
}
