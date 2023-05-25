import React from "react";

const Dropdown = ({ type, name, value, handleChange, options }) => {
  return (
    <div className="form-row form-row_1">
      <label htmlFor={name} className="form-label form-label_1">
        {name.charAt(0).toUpperCase() + name.slice(1)}
      </label>
      {type === "dropdown" ? (
        <select
          name={name}
          value={value}
          onChange={handleChange}
          className="form-input form-input_1"
        >
          <option value="">Select an option</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={handleChange}
          className="form-input form-input_1"
        />
      )}
    </div>
  );
};

export default Dropdown;
