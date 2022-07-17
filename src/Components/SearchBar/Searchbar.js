import React from "react";
import "./style.css";
import SearchIcon from "../../resources/icons/IconSearch";

export const Searchbar = () => {
  return (
    <div className="searchBar">
      <div className="input-area">
        <SearchIcon />
        <input
          placeholder="Search GitHub username.."
          className="search-place"
        />
      </div>
      <button className="search-btn">Search</button>
    </div>
  );
};
