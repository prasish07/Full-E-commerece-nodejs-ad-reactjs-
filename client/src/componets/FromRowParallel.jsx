import React from "react";

const FormRowParallel = ({ type, name, value, handleChange, component }) => {
  return (
    <div className="form-row form-row_1">
      <label htmlFor={name} className="form-label form-label_1">
        {name.charAt(0).toUpperCase() + name.slice(1)}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={handleChange}
        className="form-input form-input_1"
      />
    </div>
  );
};

export default FormRowParallel;
