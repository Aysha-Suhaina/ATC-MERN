const SearchBar = ({
  search,
  setSearch,
}) => {
  return (
    <input
    className="chat-search"
    type="text"
    placeholder="Search users..."
    value={search}
    onChange={(e)=>setSearch(e.target.value)}
/>
  );
};

export default SearchBar;