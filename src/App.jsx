import { useEffect, useState } from "react";
import "./App.scss";
import Pagination from "./components/Pagination";
import Table from "./components/Table";

export default function App() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);

  const [totalPages, setTotalPages] = useState(0);

  const [searchText, setSearchText] = useState("");

  const [selected, setSelected] = useState(0);

  const handleSearch = (_searchText) => {
    setSearchText(_searchText);
    const filteredData = data.filter((item) => {
      return (
        item.name.toLowerCase().includes(_searchText.toLowerCase()) ||
        item.email.toLowerCase().includes(_searchText.toLowerCase()) ||
        item.role.toLowerCase().includes(_searchText.toLowerCase())
      );
    });
    setFilteredData([...filteredData]);
    setCurrentPage(1);
  };
  const updateSearchResult = (_searchText) => {
    setSearchText(_searchText);
    const filteredData = data.filter((item) => {
      return (
        item.name.toLowerCase().includes(_searchText.toLowerCase()) ||
        item.email.toLowerCase().includes(_searchText.toLowerCase()) ||
        item.role.toLowerCase().includes(_searchText.toLowerCase())
      );
    });
    setFilteredData([...filteredData]);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(
          "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
        );
        const jsonData = await res.json();
        setData(jsonData);
        setFilteredData(jsonData);
        setTotalPages(Math.ceil(jsonData.length / 10));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (filteredData) {
      setTotalPages(Math.ceil(filteredData.length / 10));
    } else {
      setTotalPages(Math.ceil(data.length / 10));
    }
  }, [data, filteredData]);

  useEffect(() => {
    const updatedFilteredData = filteredData.filter((item) =>
      data.some((dataItem) => dataItem.id === item.id)
    );

    const finalFilteredData = updatedFilteredData.map((item) => {
      const correspondingDataItem = data.find(
        (dataItem) => dataItem.id === item.id
      );

      return correspondingDataItem ? { ...correspondingDataItem } : item;
    });
    setFilteredData(finalFilteredData);
    updateSearchResult(searchText);
  }, [data]);

  const startIndex = (currentPage - 1) * 10;
  const endIndex = startIndex + 10;

  return (
    <div className="app_container">
      <Table
        data={data}
        setData={setData}
        filteredData={filteredData}
        setFilteredData={setFilteredData}
        start={startIndex}
        end={endIndex}
        setCurrentPage={setCurrentPage}
        handleSearch={handleSearch}
        setSelected={setSelected}
      ></Table>
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
        totalData={filteredData.length}
        selected={selected}
      ></Pagination>
    </div>
  );
}
