// Calculator with basic arithmetic operations and error handling

/**
 * Validates if the input is a valid number
 * @param {*} value - Value to validate
 * @returns {boolean} - True if valid number
 */
function isValidNumber(value) {
  return typeof value === 'number' && !isNaN(value) && isFinite(value);
}

/**
 * Adds two numbers
 * @param {number} a - First number
 * @param {number} b - Second number
 * @returns {number} - Sum of a and b
 * @throws {Error} - If inputs are not valid numbers
 */
function add(a, b) {
  if (!isValidNumber(a) || !isValidNumber(b)) {
    throw new Error('Both arguments must be valid numbers');
  }
  return a + b;
}

/**
 * Subtracts b from a
 * @param {number} a - First number
 * @param {number} b - Second number
 * @returns {number} - Result of a - b
 * @throws {Error} - If inputs are not valid numbers
 */
function subtract(a, b) {
  if (!isValidNumber(a) || !isValidNumber(b)) {
    throw new Error('Both arguments must be valid numbers');
  }
  return a - b;
}

/**
 * Multiplies two numbers
 * @param {number} a - First number
 * @param {number} b - Second number
 * @returns {number} - Product of a and b
 * @throws {Error} - If inputs are not valid numbers
 */
function multiply(a, b) {
  if (!isValidNumber(a) || !isValidNumber(b)) {
    throw new Error('Both arguments must be valid numbers');
  }
  return a * b;
}

/**
 * Divides a by b
 * @param {number} a - Dividend
 * @param {number} b - Divisor
 * @returns {number} - Result of a / b
 * @throws {Error} - If inputs are not valid numbers or division by zero
 */
function divide(a, b) {
  if (!isValidNumber(a) || !isValidNumber(b)) {
    throw new Error('Both arguments must be valid numbers');
  }
  if (b === 0) {
    throw new Error('Cannot divide by zero');
  }
  return a / b;
}

// Export functions for use in other modules
module.exports = {
  add,
  subtract,
  multiply,
  divide
};