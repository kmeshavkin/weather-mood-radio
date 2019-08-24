export function getRandom(itemArray) {
  return itemArray[(Math.random() * itemArray.length) | 0];
}

export function formatNumber(num) {
  return `${String(Math.floor(num / 60)).padStart(2, 0)}:${String(
    num % 60
  ).padStart(2, 0)}`;
}
