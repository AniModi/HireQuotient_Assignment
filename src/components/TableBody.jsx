import React, { useState } from "react";
import "./TableBody.scss";
import { ImCheckboxUnchecked, ImCheckboxChecked } from "react-icons/im";
import { FaEdit, FaSave, FaTrashAlt } from "react-icons/fa";
import { MdCancel } from "react-icons/md";

export default function TableBody({
  data,
  filteredData,
  setData,
  selectedItems,
  setSelectedItems,
  start,
  end,
}) {
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState(null);
  const handleEditClick = (itemId) => {
    setEditData({ ...data.find((item) => item.id === itemId) });
    setEditId(itemId);
  };

  const handleSave = () => {
    const newData = data.map((item) => (item.id === editId ? editData : item));
    setData(newData);
    setEditId(null);
    setEditData(null);
  };

  const handleCheckboxClick = (itemId) => {
    setSelectedItems((prevSelectedItems) => {
      if (prevSelectedItems.includes(itemId)) {
        return prevSelectedItems.filter((item) => item !== itemId);
      } else {
        return [...prevSelectedItems, itemId];
      }
    });
  };

  const handleCancel = () => {
    setEditId(null);
    setEditData(null);
  };

  const handleInput = (event) => {
    setEditData({ ...editData, [event.target.name]: event.target.value });
  };

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
    setSelectedItems(selectedItems.filter((item) => item !== id));
  };
  return (
    <tbody className="table_body_container">
      {filteredData.map((item, index) => {
        if(index < start || index >= end) {
          return <tr key={item.id}></tr>
        }
        return (
          <tr key={item.id} className={`table_body_container__row ${selectedItems.includes(item.id) && "table_body_container__row__selected"}`}>
            <td
              className="table_body_container__row__select"
              onClick={() => handleCheckboxClick(item.id)}
            >
              {selectedItems.includes(item.id) ? (
                <ImCheckboxChecked />
              ) : (
                <ImCheckboxUnchecked />
              )}
            </td>
            <td className="table_body_container__row__name">
              {item.id === editId ? (
                <input
                  className="table_body_container__row__input"
                  name="name"
                  onChange={handleInput}
                  value={editData["name"]}
                ></input>
              ) : (
                <div>{item.name}</div>
              )}
            </td>
            <td className="table_body_container__row__email">
              {item.id === editId ? (
                <input
                  className="table_body_container__row__input"
                  name="email"
                  onChange={handleInput}
                  value={editData["email"]}
                ></input>
              ) : (
                <div>{item.email}</div>
              )}
            </td>
            <td className="table_body_container__row__role">
              {item.id === editId ? (
                <input
                  className="table_body_container__row__input"
                  name="role"
                  onChange={handleInput}
                  value={editData["role"]}
                ></input>
              ) : (
                <div>{item.role}</div>
              )}
            </td>
            <td className="table_body_container__row__action">
              <div className="table_body_container__row__action__container">
                <button
                  className="table_body_container__row__action__container__edit_button edit"
                  onClick={() => handleEditClick(item.id)}
                >
                  <FaEdit />
                </button>
                <button
                  className="table_body_container__row__action__container__delete_button delete"
                  onClick={() => handleDelete(item.id)}
                >
                  <FaTrashAlt />
                </button>
                {item.id === editId ? (
                  <>
                    <button
                      className="table_body_container__row__action__container__save_button save"
                      onClick={handleSave}
                    >
                      <FaSave />
                    </button>
                    <button
                      className="table_body_container__row__action__container__cancel_button cancel"
                      onClick={handleCancel}
                    >
                      <MdCancel />
                    </button>
                  </>
                ) : (
                  <></>
                )}
              </div>
            </td>
          </tr>
        );
      })}
    </tbody>
  );
}
