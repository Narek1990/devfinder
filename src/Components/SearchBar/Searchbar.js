import React, { useState } from "react";
import "./style.css";
import SearchIcon from "../../resources/icons/IconSearch";

export const Searchbar = ({ setUserName }) => {
  const [inputValue, setInputValue] = useState("");
  const SetNewUsername = () => {
    // inputValue ? setUserName(inputValue) : alert("apsos");
    inputValue && setUserName(inputValue);
  };

  return (
    <div className="searchBar">
      <div className="input-area">
        <SearchIcon />
        <input
          placeholder="Search GitHub username.."
          className="search-place"
          onChange={(event) => setInputValue(event.target.value)}
        />
      </div>
      <button className="search-btn" onClick={SetNewUsername}>
        Search
      </button>
    </div>
  );
};
