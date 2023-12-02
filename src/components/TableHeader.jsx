import React from "react";
import "./TableHeader.scss";
import { ImCheckboxUnchecked, ImCheckboxChecked } from "react-icons/im";


export default function TableHeaderAction({ handleSelectAllClick, selectAll }) {
  return (
    <thead className="table_header_container">
      <tr className="table_header_container__row">
        <th
          className="table_header_container__row__select"
          onClick={handleSelectAllClick}
        >
          {selectAll ? <ImCheckboxChecked /> : <ImCheckboxUnchecked />}
        </th>
        <th className="table_header_container__row__name">Name</th>
        <th className="table_header_container__row__email">Email</th>
        <th className="table_header_container__row__role">Role</th>
        <th className="table_header_container__row__action">Actions</th>
      </tr>
    </thead>
  );
}
