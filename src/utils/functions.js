export function getRandom(itemArray) {
  return itemArray[(Math.random() * itemArray.length) | 0];
}
