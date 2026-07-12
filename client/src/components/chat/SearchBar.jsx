const SearchBar = ({
  search,
  setSearch,
}) => {
  return (
    <input
      type="text"
      placeholder="Search users..."
      value={search}
      onChange={(e) =>
        setSearch(e.target.value)
      }
      style={{
        width: "100%",
        padding: "8px",
      }}
    />
  );
};

export default SearchBar;