import React, { useState } from "react";

const Form = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    column1: "",
    column2: "",
    // Добавьте нужное количество полей
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
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label>Column 1</label>
        <input
          name="column1"
          value={formData.column1}
          onChange={handleChange}
          className="input-field"
        />
      </div>
      <div>
        <label>Column 2</label>
        <input
          name="column2"
          value={formData.column2}
          onChange={handleChange}
          className="input-field"
        />
      </div>
      {/* Добавьте другие поля */}
      <button type="submit" className="submit-button">
        Submit
      </button>
    </form>
  );
};

export default Form;
