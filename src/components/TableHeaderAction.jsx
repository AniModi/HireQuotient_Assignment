import React from "react";
import "./TableHeaderAction.scss";
import SearchBar from "./SearchBar";
import { FaTrashAlt } from "react-icons/fa";

export default function TableHeaderAction({
  handleDelete,
  searchText,
  setSearchText,
  handleSearch,
}) {
  return (
    <>
      <div className="header_actions_container">
        <div className="header_actions_container__search_box">
          <SearchBar
            searchText={searchText}
            setSearchText={setSearchText}
            handleSearch={handleSearch}
          />
        </div>
        <div className="header_actions_container__delete_button_container">
          <button
            className="header_actions_container__delete_button_container_button"
            onClick={handleDelete}
          >
            <FaTrashAlt />
          </button>
        </div>
      </div>
    </>
  );
}
