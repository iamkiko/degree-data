import React from "react";

// Component to filter results
const Search = ({ handleSearch, query }) => {
  return (
    <div>
      <h4>Search for relevant degrees:</h4>
      <input type="text" value={query} onChange={handleSearch} />
    </div>
  );
};

export default Search;
