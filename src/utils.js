/**
 * Parses inputs from e.target.value and returns the input type
 */
const getInputType = (input) => {
  // Mathematical Operators
  const operators = ["/", "*", "-", "+"];
  // Actions (Clear and Equals)
  const action = ["AC", "="];
  // Decimal Point
  const decimal = ".";

  // Return correct type
  switch (true) {
    case operators.includes(input):
      return "operator";
    case action.includes(input):
      if (input === "AC") {
        return "clear";
      } else {
        return "equal";
      }
    case input === decimal:
      return "decimal";
    case !isNaN(input):
      return "num";
    default:
      return "unknown";
  }
};

/*
 * Returns the last whole number (including decimals) from the Input String
 */
const getLastCompleteNumber = (inputString) => {
  // Regex
  const matches = inputString.toString().match(/(\d+\.?\d*)$/);
  if (matches && matches.length > 0) {
    return matches[0];
  } else {
    return "0";
  }
};

/*
 * Checks if a decimal is present in the input
 */
const hasDecimal = (currentInput) => {
  return currentInput.indexOf(".") !== -1;
};

/*
 * Truncates a number to fit within the character limit
 */
const truncateNumber = (number) => {
  const numStr = number.toFixed(10); // Convert the number to a string with 10 decimal places
  const truncatedStr = numStr.replace(/\.?0+$/, ""); // Remove trailing zeros and optional decimal point
  return truncatedStr;
};

// Exports
export { getInputType, getLastCompleteNumber, hasDecimal, truncateNumber };
