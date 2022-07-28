import React, { useState } from "react";
import "./style.css";
import SearchIcon from "../../resources/icons/IconSearch";

export const Searchbar = ({ setUserName, displayMode,setDisplayMode }) => {
  const [inputValue, setInputValue] = useState("");
  const SetNewUsername = () => {
    inputValue ? setUserName(inputValue) : alert("there is no user");
    // inputValue && setUserName(inputValue);
  };

  return (
    <div className={`${displayMode === "Dark" ? "searchBar" : "searchBarlight"}`}>
      <div className="input-area">
        <SearchIcon />
        <input
          placeholder="Search GitHub username.."
          className={`${displayMode === "Dark" ? "search-place" : "search-placelight"}`}
          onChange={(event) => setInputValue(event.target.value)}
        />
        <p className="errormessage">No results</p>
      </div>
      <button className="search-btn" onClick={SetNewUsername}>
        Search
      </button>
    </div>
  );
};
