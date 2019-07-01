import { DEFAULT_PROJECT, DEFAULT_START, INITIAL_CYCLE } from './constants'
import Storage from './storage'

/**
 * Retrieves cached projects array from localStorage
 *
 * @memberof Misc
 * @returns Array
 */
export function getInitialPomodoro() {
  const defaults = {
    cycle: INITIAL_CYCLE,
    project: DEFAULT_PROJECT,
    duration: DEFAULT_START,
    remaining: DEFAULT_START,
  }
  return Object.assign({}, defaults, Storage.get('pomodoro'))
}

/**
 * Retrieves cached projects array from localStorage
 *
 * @memberof Misc
 * @returns Array
 */
export function getInitialProjects() {
  const projects = Storage.get('projects') || []
  return projects.length ? projects : [DEFAULT_PROJECT]
}

/**
 * A non-operation functional utility method
 *
 * @memberof Misc
 */
export function noop() {}

/**
 * Moves the DEFAULT_PROJECT to beginning of array
 *
 * @param {Array} ary The array of string values to sort
 * @memberof Misc
 * @returns Array
 */
export function sortDefaultFirst(ary) {
  return [
    DEFAULT_PROJECT,
    ...ary.filter(item => item !== DEFAULT_PROJECT).sort(),
  ]
}

/**
 * Creates a new Pomodoro instance to add to state
 *
 * @param {Object} pomodoro The Pomodoro object to cache
 * @param {number} pomodoro.cycle The current active Pomodoro cycle
 * @param {number} pomodoro.duration The total duration of the Pomodoro
 * @param {string} pomodoro.project The project name for the Pomodoro
 * @param {number} pomodoro.remaining The time till Pomodoro is completed

 * @memberof Misc
 * @returns Object
 */
export function toPomodoroState(pomodoro) {
  Storage.set('pomodoro', pomodoro)
  return pomodoro
}

/**
 * Sorts and caches the projects array to localStorage, returning sorted array
 *
 * @param {Array} projects The array of projects names to sort
 * @memberof Misc
 * @returns Array
 */
export function toProjectsState(projects) {
  projects = sortDefaultFirst(projects)
  Storage.set('projects', projects)
  return projects
}
