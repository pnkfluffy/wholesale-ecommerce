import React from "react";

const InputField = ({
  widthCSS,
  title,
  name,
  value,
  type,
  changeField,
  placeholder,
  error,
}) => {
  return (
    <div className={widthCSS}>
      <div className="raffle_input_title">{title}</div>
      <div className={`input_container  + ${error && "input_error"}`}>
        <input
          name={name}
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={(e) => changeField(e)}
          className="input_input"
        />
      </div>
    </div>
  );
};

export default InputField;
