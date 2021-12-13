import React from 'react';

const InputLeer = ({ label, name, defaultValue, type, required }) => {
  return (
    <label htmlFor={name} className='flex flex-col my-3'>
      <span>{label}</span>
      <input
        readOnly="readonly"
        type={type}
        name={name}
        className='input'
        disabled
      />
    </label>
  );
};

export default InputLeer;