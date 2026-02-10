import React from 'react';

const FormTextarea = ({ 
  label, 
  name, 
  value, 
  onChange, 
  placeholder,
  maxLength = 1000,
  rows = 6,
  required = false,
  className = '' 
}) => {
  return (
    <div className={className}>
      <label htmlFor={name} className="block text-sm font-semibold text-gray-900 mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        rows={rows}
        maxLength={maxLength}
        className="w-full px-4 py-3 rounded-2xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-200 resize-none bg-white"
      />
      <div className="mt-1 text-right text-xs text-gray-500">
        {value?.length || 0}/{maxLength} characters
      </div>
    </div>
  );
};

export default FormTextarea;
