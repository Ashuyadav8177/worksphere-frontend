import { useState } from "react";

function Dropdown({ label, children }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative w-full">
      <button
        type="button"
        onClick={handleToggle}
        className={`flex h-10 w-full items-center justify-between rounded-lg border bg-white px-3 text-sm text-gray-700 outline-none transition-all duration-200 ${
          isOpen
            ? "border-violet-500 ring-2 ring-violet-500/10"
            : "border-gray-200 hover:border-gray-300"
        }`}
      >
        <span className={label ? "text-gray-700" : "text-gray-400"}>
          {label || "Select an option"}
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1.5 w-full overflow-hidden rounded-lg border border-gray-100 bg-white shadow-lg">
          {children}
        </div>
      )}
    </div>
  );
}

export default Dropdown;
