import React, { useEffect, useState } from "react";
import {
  getInputType,
  getLastCompleteNumber,
  hasDecimal,
  truncateNumber,
} from "./utils";
import PeaksBG from "./assets/bg-peaks.svg";
import Key from "./components/Keypad/Key";
import { evaluate } from "mathjs";
import Display from "./components/Display";

function App() {
  // States
  const [inputString, setInputString] = useState("");
  const [currentInput, setCurrentInput] = useState(0);
  const [result, setResult] = useState("");

  // Auto Enforce 15 digit limit for inputs
  useEffect(() => {
    const lastCompleteNum = getLastCompleteNumber(inputString);
    if (lastCompleteNum.length < 15) setCurrentInput(lastCompleteNum);
  }, [inputString]);

  const handleClick = (e) => {
    // Current Input and Type
    const val = e.target.value;
    const type = getInputType(val);
    // Last character
    const lastChar = inputString.toString().slice(-1);

    // Handle Input
    switch (type) {
      // Handle Operator inputs
      case "operator": {
        // Return if duplicate operators present
        if (val === lastChar) return;

        if (val === "-") {
          // Default Case, proceed as normal
          setInputString((prevString) => prevString + val);
        } else {
          // Check and Replace consecutive operators
          const consecutiveOperators = /[+\-*/]{2,}/g;
          if (consecutiveOperators.test(inputString)) {
            const replacedString = inputString
              .toString()
              .replace(consecutiveOperators, val);
            setInputString(replacedString);
          } else {
            // Also default, move on
            setInputString((prevString) => prevString + val);
          }
        }
        break;
      }

      // Handle Clear action
      case "clear": {
        setInputString("");
        setCurrentInput(0);
        setResult();
        break;
      }

      // Handle expression calculation
      case "equal": {
        const finalResult = evaluate(inputString);
        setInputString(finalResult);
        setResult(truncateNumber(finalResult));
        break;
      }

      // Handle Decimal points
      case "decimal": {
        if (!hasDecimal(currentInput)) {
          setInputString((prevString) => prevString + val);
        }
        break;
      }

      // Handle numbers
      case "num": {
        if (
          getLastCompleteNumber(inputString).length < 15 &&
          lastChar !== "0"
        ) {
          setInputString((prevString) => prevString + val);
        }
        break;
      }

      // Handle unknown type, do nothing.
      case "unknown": {
        break;
      }

      // Fallback, do nothing.
      default: {
        break;
      }
    }
  };

  return (
    <div
      className="flex flex-col justify-center items-center text-center bg-fixed bg-center bg-cover"
      style={{
        height: "100dvh",
        backgroundImage: `url(${PeaksBG})`,
      }}
    >
      <div
        className="container flex flex-col p-2 space-y-4 w-4/5 md:w-3/5 lg:w-1/5 glass"
        style={{
          height: "60%",
        }}
      >
        {/* Display */}
        <Display
          result={result}
          expression={inputString}
          input={currentInput}
        />
        {/* Keypad */}
        <div className="w-full h-4/5 text-center">
          <div className="grid grid-cols-4 grid-rows-5 gap-2 h-full">
            {/* Row 1 */}
            <Key
              id={"clear"}
              className="col-span-2 row-span-1"
              value={"AC"}
              onClick={handleClick}
              type="clear"
            />
            <Key
              id={"divide"}
              className="col-span-1 row-span-1"
              value={"/"}
              onClick={handleClick}
              type="operator"
            />
            <Key
              id={"multiply"}
              className="col-span-1 row-span-1"
              value={"*"}
              onClick={handleClick}
              type="operator"
            />
            {/* Row 2 */}
            <Key
              id={"seven"}
              className="col-span-1 row-span-1"
              value={"7"}
              onClick={handleClick}
              type="num"
            />
            <Key
              id={"eight"}
              className="col-span-1 row-span-1"
              value={"8"}
              onClick={handleClick}
              type="num"
            />
            <Key
              id={"nine"}
              className="col-span-1 row-span-1"
              value={"9"}
              onClick={handleClick}
              type="num"
            />
            <Key
              id={"subtract"}
              className="col-span-1 row-span-1"
              value={"-"}
              onClick={handleClick}
              type="operator"
            />

            {/* Row 3 */}
            <Key
              id={"four"}
              className="col-span-1 row-span-1"
              value={"4"}
              onClick={handleClick}
              type="num"
            />
            <Key
              id={"five"}
              className="col-span-1 row-span-1"
              value={"5"}
              onClick={handleClick}
              type="num"
            />
            <Key
              id={"six"}
              className="col-span-1 row-span-1"
              value={"6"}
              onClick={handleClick}
              type="num"
            />
            <Key
              id={"add"}
              className="col-span-1 row-span-1"
              value={"+"}
              onClick={handleClick}
              type="operator"
            />
            {/* Row 4 and 5*/}
            <Key
              id={"one"}
              className="col-span-1 row-span-1"
              value={"1"}
              onClick={handleClick}
              type="num"
            />
            <Key
              id={"two"}
              className="col-span-1 row-span-1"
              value={"2"}
              onClick={handleClick}
              type="num"
            />
            <Key
              id={"three"}
              className="col-span-1 row-span-1"
              value={"3"}
              onClick={handleClick}
              type="num"
            />
            <Key
              id={"equals"}
              className="col-span-1 row-span-2"
              value={"="}
              onClick={handleClick}
              type="equals"
            />
            <Key
              id={"zero"}
              className="col-span-2 row-span-1"
              value={"0"}
              onClick={handleClick}
              type="num"
            />
            <Key
              id={"decimal"}
              className="col-span-1 row-span-1"
              value={"."}
              onClick={handleClick}
              type="num"
            />
          </div>
        </div>
      </div>
      {/* Attribution */}
      <span className="my-2 text-white text-opacity-75">
        Designed and Coded by{" "}
        <a
          className="underline link"
          href="https://rifkisalim.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Rifki Salim
        </a>
        .
      </span>
    </div>
  );
}

export default App;
