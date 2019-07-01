import {
  DEFAULT_PROJECT,
  DEFAULT_START,
  INITIAL_CYCLE,
  MAX_CYCLES,
} from './constants'
import Storage from './storage'

/**
 * Retrieves cached logs and aggregates by project name
 *
 * @memberof Misc
 * @returns Array
 */
export function aggregateLogsByProject() {
  const logs = Storage.get('log') || []
  const grouped = logs.reduce((agg, log) => {
    const [name, duration] = log
    if (!agg[name]) {
      agg[name] = { project: name, total: 0, entries: 0 }
    }
    agg[name].total += duration
    agg[name].entries += 1
    return agg
  }, {})
  return Object.values(grouped)
}

/**
 * Exports all logged Pomodoros to CSV
 *
 * @memberof Misc
 */
export function exportLogsToCsv() {
  const logs = [...(Storage.get('log') || [])]
  logs.unshift(['project', 'seconds', 'date'])

  const csv =
    'data:text/csv;charset=utf-8,' + logs.map(row => row.join(',')).join('\n')

  const data = encodeURI(csv)
  const link = document.createElement('a')
  link.setAttribute('href', data)
  link.setAttribute('download', 'pomodoro_log.csv')
  link.click()
}

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
 * Archives Pomodoro to log and returns a fresh Pomodoro state
 *
 * @param {Object} pomodoro The Pomodoro object to archive
 * @param {number} pomodoro.cycle The current active Pomodoro cycle
 * @param {number} pomodoro.duration The total duration of the Pomodoro
 * @param {string} pomodoro.project The project name for the Pomodoro
 * @param {number} pomodoro.remaining The time till Pomodoro is completed
 * @memberof Misc
 * @returns Object
 */
export function logAndResetPomodoro({
  cycle: prevCycle,
  project,
  duration,
  remaining,
}) {
  const log = Storage.get('log') || []
  const cycle = prevCycle + 1 > MAX_CYCLES ? 1 : prevCycle + 1
  const record = [
    project, // Project name
    duration - remaining, // Elapsed duration
    new Date().toISOString(), // Time completed
  ]

  log.push(record)
  Storage.set('log', log)

  const pomodoro = {
    duration: DEFAULT_START,
    remaining: DEFAULT_START,
    cycle,
    project,
  }

  Storage.set('pomodoro', pomodoro)
  return pomodoro
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
