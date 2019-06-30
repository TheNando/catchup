/**
 * Move the word 'Default' to beginning of array
 *
 * @param {Array} ary
 * @memberof Timer
 */
export function sortDefaultFirst(ary) {
  return ['Default', ...ary.filter(item => item !== 'Default').sort()]
}
