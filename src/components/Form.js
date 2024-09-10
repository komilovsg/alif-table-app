import React, { useState } from "react";

const Form = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    title: "",
    body: "",
    userId: 1,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      title: "",
      body: "",
      userId: 1,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="container mx-auto flex flex-col gap-2 mt-20"
    >
      <div>
        <h1 className="font-semibold text-green-500">Тестовое задание</h1>
      </div>
      <div className="flex flex-col items-start">
        <label className="font-semibold">Заголовок:</label>
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="border-2 rounded-sm w-full"
        />
      </div>
      <div className="flex flex-col items-start">
        <label className="font-semibold">Описание:</label>
        <input
          name="body"
          value={formData.body}
          onChange={handleChange}
          className="border-2 rounded-sm w-full"
        />
      </div>
      <button
        type="submit"
        className="border-2 rounded-sm shadow-md bg-blue-500 text-white"
      >
        Добавить пост
      </button>
    </form>
  );
};

export default Form;
