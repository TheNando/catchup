import { DEFAULT_START, TIMER_RESOLUTION } from './constants'
import { noop } from './misc'

/**
 * Create a Timer
 *
 * @param {number}   duration
 *                   The amount of time the Timer should run for
 * @param {Object}   options
 *                   Configuration for Timer
 * @param {number}   options.elapsed
 *                   The time offset at which to begin countdown
 * @param {function} options.onTick
 *                   A function to execute on every tick
 * @param {function} options.onPause
 *                   A function to execute when pausing the Timer
 * @param {function} options.onResume
 *                   A function to execute when resuming the Timer
 * @param {function} options.onDone
 *                   A function to execute once the Timer completes
 * @memberof Time
 * @returns Timer
 */
export class Timer {
  constructor(
    duration,
    {
      elapsed = 0,
      onTick = noop,
      onPause = noop,
      onResume = noop,
      onDone = noop,
    }
  ) {
    this.duration = duration
    this.isDone = false
    this.remaining = (duration - elapsed) * 1000
    this.onTick = onTick
    this.onPause = onPause
    this.onResume = onResume
    this.onDone = onDone

    this.onTick(this.remaining / 1000, false)
  }

  complete = () => {
    clearInterval(this.timerId)
    this.onDone(true)
  }

  pause = () => {
    clearInterval(this.timerId)
    this.onPause()
    this.remaining = this.step()
    this.timerId = null
  }

  reset = () => {
    clearInterval(this.timerId)
    this.onDone(false)
    this.onTick(DEFAULT_START, false)
  }

  resume = () => {
    if (this.isDone) return

    this.start = Date.now()
    this.timerId = setInterval(this.step, TIMER_RESOLUTION)
    this.onResume()
  }

  step = () => {
    const now = Math.max(0, this.remaining - (Date.now() - this.start))
    const secs = Math.floor(now / 1000)

    this.onTick(secs)

    if (now == 0) {
      clearInterval(this.timerId)
      this.onDone(true)
      this.isDone = true
    }

    return now
  }
}

/**
 * Convert mm:ss time string into total seconds number
 *
 * @param {string} time The time string to convert
 * @memberof Time
 * @returns number
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
 * @param {number} secs The number of seconds to convert
 * @memberof Time
 * @returns string
 */
export function secondsToString(secs) {
  return `${Math.floor(secs / 60)}:${toPadded(secs % 60)}`
}

/**
 * Returns num as a 2-place zero-padded string
 *
 * @param {number} time The number to pad as a string
 * @memberof Time
 * @returns string
 */

export function toPadded(num) {
  return num.toString().padStart(2, '0')
}
