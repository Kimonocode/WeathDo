
/**
 * Retourne un tableaux contenant tous les nombres entre x et y
 * @param arr number[x,y]
 * @returns number[]
 */
function getNumbersBetween(arr: number[]): number[] {
  let highNum = Math.max(...arr);
  let lowNum = Math.min(...arr);
  let arrayBetween = [];

  for (let i = lowNum; i <= highNum; i++) {
    arrayBetween.push(i);
  }
  return arrayBetween;
}

export { getNumbersBetween };