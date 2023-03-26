const isNotNumber = (input: unknown): boolean => {
  return isNaN(Number(input));
};

/**
 * Turns array of strings into array of numbers (if all can be parsed)
 * @param arr
 * @returns Array of numbers. Except if some member of the array
 *          cannot be parsed into a number, undefined is returned.
 */
const parseNumberArray = (arr: string[]): number[] | undefined => {
  const allAreNumbers = arr.every((v) => !isNotNumber(v));
  if (!allAreNumbers) return undefined;
  return arr.map((v) => Number(v));
};

export { isNotNumber, parseNumberArray };
