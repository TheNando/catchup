/**
 * Convert mm:ss time string into total seconds number
 *
 * @param {string} time
 * @memberof Timer
 */
export function parseTime(time) {
  const [mins = 0, secs = 0] = time.split(':').map(Number)

  if (mins < 0 || mins > 60) {
    throw 'Timer start minutes must be between 0 and 60'
  }

  if (secs < 0 || secs > 60) {
    throw 'Timer start seconds must be between 0 and 60'
  }

  if (mins === 60 && secs > 0) {
    throw 'Timer start time maximum is 60 mins'
  }

  return mins * 60 + secs
}

/**
 * Convert number of secs into time string for display
 *
 * @param {number} secs
 * @memberof Timer
 */
export function secondsToString(secs) {
  return `${Math.floor(secs / 60)}:${toPadded(secs % 60)}`
}

/**
 * Returns num as a 2-place zero-padded string
 *
 * @param {number} time
 * @memberof Timer
 */

export function toPadded(num) {
  return num.toString().padStart(2, '0')
}
