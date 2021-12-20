import React from 'react';

const InputLeer = ({ label, name, defaultValue, type, readOnly}) => {
  return (
    <label htmlFor={name} className='flex flex-col my-3'>
      <span>{label}</span>
      <input
        type={type}
        name={name}
        className='input'
        defaultValue={defaultValue}
        readOnly="readonly"
      />
    </label>
  );
};

export default InputLeer;