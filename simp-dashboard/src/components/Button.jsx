"use client";

export default function Button({ children, onClick, className = '' }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 bg-indigo-600 text-white font-medium rounded shadow-md hover:bg-indigo-700 hover:shadow-lg transition-all duration-200 ${className}`}
    >
      {children}
    </button>
  );
}
