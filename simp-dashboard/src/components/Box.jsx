import React from 'react';

const Box = ({ children, className = '' }) => {
  return (
    <div className={`w-full min-w-0 mx-auto border border-(--mtr-gray) rounded-[20px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] ${className}`}>
      {children}
    </div>
  );
};

export default Box;