import React from "react";

export default function Key({ id, className, value, type, onClick }) {
  let colorClass = "";
  switch (type) {
    case "num": {
      colorClass = "bg-blue-400 hover:bg-blue-500 text-blue-100";
      break;
    }
    case "operator": {
      colorClass = "bg-gray-400 hover:bg-gray-500 text-gray-100";
      break;
    }
    case "clear": {
      colorClass = "bg-red-400 hover:bg-red-500 text-red-100";
      break;
    }
    case "equals": {
      colorClass = "bg-green-400 hover:bg-green-500 text-green-100";
      break;
    }
    default: {
      break;
    }
  }

  return (
    <button
      value={value}
      onClick={onClick}
      id={id}
      className={`flex flex-col justify-center items-center h-full text-2xl rounded ${colorClass} glass-key ${className}`}
    >
      {value}
    </button>
  );
}
