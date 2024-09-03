import React, { useMemo, useState, useEffect } from "react";
import axios from "axios";
import Table from "./components/Table";
import Form from "./components/Form";

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const columns = useMemo(
    () => [
      {
        Header: "Column 1",
        accessor: "column1",
      },
      {
        Header: "Column 2",
        accessor: "column2",
      },
      // Добавьте нужное количество столбцов (от 5 до 15)
    ],
    []
  );

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/posts").then((response) => {
      setData(response.data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  const handleSubmit = (newData) => {
    setData([...data, newData]);
  };

  return (
    <div className="App">
      <Form onSubmit={handleSubmit} />
      <Table columns={columns} data={data} />
    </div>
  );
}

export default App;
