"use client";

import { useState, useRef } from "react";

export default function Dropdown({
  lists = [],
  value = [],
  onChange,
  placeholder = "",
  className = "",
}) {
  const [dropdownOpen, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const inputRef = useRef(null);

  const toggleDropdown = (e) => {
    e.preventDefault();
    if (dropdownOpen) {
      setOpen(false);
      inputRef.current?.blur();
    } else {
      setOpen(true);
      inputRef.current?.focus();
    }
  };

  const handleSelect = (e, item) => {
    e.preventDefault();
    e.stopPropagation();

    if (!onChange) return;

    if (value.includes(item)) {
      onChange(value.filter((v) => v !== item));
    } else {
      onChange([...value, item]);
    }
  };

  const filteredList = lists.filter((item) =>
    String(item).toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className={`relative ${className}`}>
      <div className="rounded border border-(--mtr-gray) flex overflow-hidden focus-within:border-blue-500 transition-colors bg-transparent">
        <input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setOpen(true)}
          onBlur={() => {
            setOpen(false);
            setSearchQuery("");
          }}
          className="px-4 py-2 outline-none bg-transparent text-gray-500 flex-1 min-w-0"
        />
        <button
          type="button"
          className="aspect-square flex-shrink-0 flex items-center justify-center px-2 hover:bg-black/10 bg-transparent relative"
          onMouseDown={toggleDropdown}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`text-gray-500 transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
          {value.length > 0 && (
            <div className="absolute right-full mr-2 bg-(--mtr-blue) text-white text-xs flex items-center gap-1 px-2 py-1 rounded-xl">
              <span className="font-bold">{value.length}</span>
              <button
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (onChange) onChange([]);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="m11.25 4.75-6.5 6.5m0-6.5 6.5 6.5"
                  />
                </svg>
              </button>
            </div>
          )}
        </button>
      </div>

      {dropdownOpen && (
        <div className="absolute top-full left-0 w-full mt-1 border border-gray-300 bg-white rounded shadow-md z-10 max-h-60 overflow-auto">
          {filteredList.length === 0 ? (
            <div className="p-3 text-sm text-gray-500 text-center">
              No items found
            </div>
          ) : (
            filteredList.map((item, index) => {
              const isSelected = value.includes(item);
              return (
                <div
                  key={index}
                  className="p-2 hover:bg-gray-100 cursor-pointer flex items-center gap-3"
                  onMouseDown={(e) => handleSelect(e, item)}
                >
                  <div
                    className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 transition-colors ${isSelected ? "bg-(--mtr-blue) border-(mtr-blue)" : "border-gray-300"}`}
                  >
                    {isSelected && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="white"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    )}
                  </div>
                  <span className="truncate text-gray-700">{String(item)}</span>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}
