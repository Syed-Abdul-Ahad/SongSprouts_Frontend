import React from 'react';

const FormInput = ({ 
  label, 
  name, 
  value, 
  onChange, 
  placeholder, 
  type = 'text',
  required = false,
  className = '' 
}) => {
  return (
    <div className={className}>
      <label htmlFor={name} className="block text-sm font-semibold text-gray-900 mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full bg-white px-4 py-3 rounded-full border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-200"
      />
    </div>
  );
};

export default FormInput;
