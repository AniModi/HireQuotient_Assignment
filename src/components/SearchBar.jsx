import React, { useState } from "react";
import "./SearchBar.scss";
import { CiSearch } from "react-icons/ci";

export default function SearchBar({handleSearch}) {
  const [searchText, setSearchText] = useState("");
  return (
    <>
      <div className="search_bar_container">
        <input type="text" placeholder="Search" onChange={(e) => setSearchText(e.target.value)} value={searchText}/>
        <div className="search_bar_container__icon_container search-icon" onClick={() => handleSearch(searchText)}>
          <CiSearch className="search_bar_container__icon_container_icon" />
        </div>
      </div>
    </>
  );
}
