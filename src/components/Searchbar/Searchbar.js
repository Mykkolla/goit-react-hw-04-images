import SearchFrom from '../SearchForm/SearchForm';
import '../../styles.css';

const Searchbar = ({ onSearch }) => (
  <header className="Searchbar">
    <SearchFrom onSearch={onSearch} />
  </header>
);

export default Searchbar;
