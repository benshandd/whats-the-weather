import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SearchBar = ({ search, setSearch, isSearchExpanded, setIsSearchExpanded, searchPressed }) => {
  return (
    <div className="search-container">
      {!isSearchExpanded && (
        <button onClick={() => setIsSearchExpanded(true)}>
          <FontAwesomeIcon icon="search" />
        </button>
      )}
      {isSearchExpanded && (
        <>
          <input
            type="text"
            placeholder="Enter location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button onClick={() => { searchPressed(); setIsSearchExpanded(false); }}>
            <FontAwesomeIcon icon="search" />
          </button>
        </>
      )}
    </div>
  );
};

export default SearchBar;