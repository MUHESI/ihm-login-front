import React from "react";

export const InputCustom = ({ pl, type, label, onChange, keyObject }) => {
  return (
    <div className='group-input'>
      <label> {label || "Label no défini"} </label>
      <input
        type={type || "text"}
        onChange={(e) => onChange(e.target.value, keyObject)}
        className='form-input'
        placeholder={pl}
      />
    </div>
  );
};
