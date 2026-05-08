import React from 'react';

const Grid = ({ children, className = '' }) => {
  return (
    <div className={`max-w-[1440px] grid grid-cols-12 gap-6 m-8 justify-items-stretch align-items-stretch ${className}`}>
      {children}
    </div>
  );
};

export default Grid;