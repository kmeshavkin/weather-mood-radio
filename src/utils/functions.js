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

/**
 * Uses canvas.measureText to compute and return the width of the given text of given font in pixels
 *
 * @param {String} text The text to be rendered
 * @param {String} fontSize The css font size
 *
 * @see https://stackoverflow.com/questions/118241/calculate-text-width-with-javascript/21015393#21015393
 */
export function getTextWidth(text, fontSize) {
  // re-use canvas object for better performance
  const canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement('canvas'));
  const context = canvas.getContext('2d');
  context.font = `${fontSize} roboto`;
  const metrics = context.measureText(text);
  return metrics.width;
}

/**
 * Capitalizes first letter of provided string
 * @param {*} str String to modify
 * @returns {String | undefined} Input string with first letter capitalized
 */
export function capitalizeFirst(str) {
  return str ? str.charAt(0).toUpperCase() + str.slice(1) : undefined;
}
