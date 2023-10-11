import React from "react";

export const Display = ({ result, input, expression }) => {
  return (
    <div className="w-full h-1/5 text-right glass">
      <div className="flex flex-col justify-center p-2 h-1/3">{expression}</div>
      <div
        id="display"
        className="flex flex-col justify-center p-2 h-2/3 text-4xl"
      >
        {result ? result : input}
      </div>
    </div>
  );
};

export default Display;
