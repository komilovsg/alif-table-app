import React, { useMemo, useState, useEffect } from "react";
import axios from "axios";
import Table from "./components/Table";
import Form from "./components/Form";

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1); // Для подгрузки новых данных
  const [hasMore, setHasMore] = useState(true); // Проверка наличия данных для загрузки

  // Колонки для таблицы
  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "Title",
        accessor: "title",
      },
      {
        Header: "User ID",
        accessor: "userId",
      },
      {
        Header: "Body",
        accessor: "body",
      },
    ],
    []
  );

  // Загрузка данных с сервера при изменении страницы
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=5`
        );

        const newData = response.data.filter(
          (newItem) => !data.some((item) => item.id === newItem.id)
        );

        setData((prevData) => [...prevData, ...newData]);
        setHasMore(response.data.length > 0);
      } catch (error) {
        console.error("Ошибка загрузки данных:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [page]);

  // Функция для подгрузки новых данных при нажатии на кнопку
  const loadMoreData = () => {
    setPage((prevPage) => prevPage + 1); // Увеличиваем страницу для загрузки новых данных
  };

  // Обработка добавления новых данных через форму
  const handleSubmit = (newData) => {
    setData((prevData) => [
      ...prevData,
      { id: prevData.length + 1, ...newData },
    ]);
  };

  return (
    <div className="container mx-auto mb-10">
      <Form onSubmit={handleSubmit} />
      <Table columns={columns} data={data} />
      {loading && (
        <p className="flex justify-center items-center mt-20 font-semibold">
          Loading...
        </p>
      )}
      {!loading && hasMore && (
        <button
          onClick={loadMoreData}
          className="w-full p-2 bg-blue-500 text-white rounded"
        >
          Загрузить еще
        </button>
      )}
    </div>
  );
}

export default App;
