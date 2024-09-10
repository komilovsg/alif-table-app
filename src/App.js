import React, { useMemo, useState, useEffect } from "react";
import axios from "axios";
import Table from "./components/Table";
import Form from "./components/Form";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: " Заголовок",
        accessor: "title",
      },
      {
        Header: "Описание",
        accessor: "body",
      },
    ],
    []
  );

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=5`
        );

        setData((prevData) => {
          const newData = response.data.filter(
            (newItem) => !prevData.some((item) => item.id === newItem.id)
          );
          return [...prevData, ...newData];
        });

        setHasMore(response.data.length > 0);
      } catch (error) {
        console.error("Ошибка загрузки данных:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [page]);

  const loadMoreData = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleSubmit = async (newData) => {
    try {
      const maxId = data.reduce(
        (max, item) => (item.id > max ? item.id : max),
        0
      );
      const newId = maxId + 1;

      const postData = { id: newId, ...newData };

      await axios.post("https://jsonplaceholder.typicode.com/posts", postData);

      setData((prevData) => [...prevData, postData]);
    } catch (error) {
      console.error("Ошибка добавления поста:", error);
    }
  };

  return (
    <div className="container mx-auto mb-10">
      <Form onSubmit={handleSubmit} />
      <Table columns={columns} data={data} />
      {loading && (
        <div className="w-full flex justify-center items-center gap-2 p-2 bg-blue-500 text-white rounded mt-2">
          <AiOutlineLoading3Quarters className="animate-spin text-white text-center w-6 h-6" />
        </div>
      )}
      {!loading && hasMore && (
        <button
          onClick={loadMoreData}
          className="w-full flex justify-center items-center gap-2 p-2 bg-blue-500 text-white rounded mt-2"
        >
          <p>Загрузить еще</p>
        </button>
      )}
    </div>
  );
}

export default App;
