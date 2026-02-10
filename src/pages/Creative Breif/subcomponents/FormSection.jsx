import React from 'react';

const FormSection = ({ title, subtitle, children, className = '' }) => {
  return (
    <div className={`bg-[#F2F1EF] rounded-2xl p-6 shadow-sm ${className}`}>
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-sm text-gray-600">{subtitle}</p>
      </div>
      {children}
    </div>
  );
};

export default FormSection;
