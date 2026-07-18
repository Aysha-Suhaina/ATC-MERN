import { FiSearch } from "react-icons/fi";

const SearchBar = ({
  value,
  onChange,
  placeholder = "Search...",
}) => {
  return (
    <div className="search-bar">
      <FiSearch className="search-icon" />

      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
};

export default SearchBar;