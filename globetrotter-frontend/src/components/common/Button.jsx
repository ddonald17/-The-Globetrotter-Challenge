import React from 'react';

const Button = ({ 
  children, 
  onClick, 
  primary = true, 
  disabled = false, 
  className = '', 
  type = 'button' 
}) => {
  const baseClasses = "px-4 py-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2";
  
  const primaryClasses = "bg-indigo-600 hover:bg-indigo-700 text-white focus:ring-indigo-500";
  const secondaryClasses = "bg-gray-200 hover:bg-gray-300 text-gray-800 focus:ring-gray-400";
  const disabledClasses = "opacity-50 cursor-not-allowed";
  
  const buttonClasses = `
    ${baseClasses} 
    ${primary ? primaryClasses : secondaryClasses} 
    ${disabled ? disabledClasses : ''} 
    ${className}
  `;
  
  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;