import pkg from 'number-to-arabic-words/dist/index-node.js';
const { toArabicWord } = pkg;

/**
 * Converts a number to its Arabic word representation, formatted for cheques.
 * Includes "فقط" at the start and "لا غير" at the end.
 * @param {number} number - The number to convert.
 * @returns {string} The formatted Arabic string.
 */
export function convertNumberToChequeArabic(number) {
  if (typeof number !== 'number') {
    throw new Error('Input must be a number.');
  }

  const arabicWords = toArabicWord(number);

  // Format for Egyptian cheques: "فقط" (Only) + amount + "لا غير" (no more)
  return `فقط ${arabicWords} لا غير`;
}
