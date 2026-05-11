"use client";

export default function Button({ children, onClick, className = '' }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 bg-indigo-600 text-white font-medium rounded shadow-[0px_4px_4px_rgba(0,0,0,0.25)] cursor-pointer hover:bg-indigo-700 hover:shadow-lg transition-all duration-200 ${className}`}
    >
      {children}
    </button>
  );
}
