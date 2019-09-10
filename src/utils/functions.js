/**
 * Returns random element from an array
 * @param {*[]} itemArray Input array
 * @returns {*} Random element from an array
 */
export function getRandom(itemArray) {
  return itemArray[(Math.random() * itemArray.length) | 0];
}

/**
 * Convert milliseconds into mm:ss format
 * @param {number} num Number in milliseconds
 * @returns {string} Time in mm:ss format
 */
export function formatNumber(num) {
  return `${String(Math.floor(num / 60)).padStart(2, 0)}:${String(num % 60).padStart(2, 0)}`;
}
