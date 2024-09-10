import React, { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Form = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    title: "",
    body: "",
    userId: 1,
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.body) {
      setError("Пожалуйста, заполните все поля.");
      return;
    }
    setLoading(true);
    setError(null);

    await onSubmit(formData);

    setFormData({
      title: "",
      body: "",
      userId: 1,
    });

    setLoading(false);
    setSuccess(true);

    setTimeout(() => {
      setSuccess(false);
    }, 2000);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="container mx-auto flex flex-col gap-2 mt-20"
    >
      <div className="flex items-center gap-2">
        <h1 className="font-semibold text-green-500">Тестовое задание</h1>
        <img
          className="rounded-full"
          src="./favicon.ico"
          alt="logo"
          width={25}
          height={25}
        />
      </div>
      <div className="flex flex-col items-start">
        <label className="font-semibold">Заголовок:</label>
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="border-2 rounded-md w-full p-2 border-blue-500"
        />
      </div>
      <div className="flex flex-col items-start">
        <label className="font-semibold">Описание:</label>
        <input
          name="body"
          value={formData.body}
          onChange={handleChange}
          className="border-2 rounded-md w-full p-2 border-blue-500"
        />
      </div>

      {error && <p className="text-red-500">{error}</p>}

      <button
        type="submit"
        className={`border-2 p-2 rounded-md ${
          loading || success ? "bg-green-500" : " bg-blue-500"
        } text-white flex justify-center items-center`}
        disabled={loading || success}
      >
        {loading ? (
          <AiOutlineLoading3Quarters className="animate-spin w-6 h-6" />
        ) : success ? (
          "Пост успешно добавлен!"
        ) : (
          "Добавить пост"
        )}
      </button>
    </form>
  );
};

export default Form;
