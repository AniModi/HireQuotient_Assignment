import React, { useEffect, useState } from "react";
import "./Table.scss";
import TableHeaderAction from "./TableHeaderAction";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";

export default function Table({
  data,
  setData,
  filteredData,
  start,
  end,
  handleSearch,
  setSelected,
}) {
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const handleSelectAllClick = () => {
    if (selectAll) {
      setSelectedItems([]);
      setSelectAll(false);
    } else {
      setSelectedItems(
        filteredData
          .filter((item, index) => {
            if (index < start || index >= end) {
              return false;
            }
            return true;
          })
          .map((item) => item.id)
      );
      setSelectAll(true);
    }
  };

  useEffect(() => {
    setSelected(selectedItems.length);
  }, [selectedItems]);

  const handleDelete = () => {
    setData(data.filter((item) => !selectedItems.includes(item.id)));
    setSelectedItems([]);
    setSelectAll(false);
  };

  return (
    <>
      <div className="table_container">
        <TableHeaderAction
          handleDelete={handleDelete}
          handleSearch={handleSearch}
        ></TableHeaderAction>
        <table className="table_container__table">
          <TableHeader
            selectAll={selectAll}
            handleSelectAllClick={handleSelectAllClick}
          ></TableHeader>
          <TableBody
            data={data}
            filteredData={filteredData}
            setData={setData}
            selectedItems={selectedItems}
            setSelectedItems={setSelectedItems}
            start={start}
            end={end}
            setSelected={setSelected}
          ></TableBody>
        </table>
      </div>
    </>
  );
}
