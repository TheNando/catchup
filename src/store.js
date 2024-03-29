import { createStore } from 'redux'
import {
  aggregateLogsByProject,
  getInitialPomodoro,
  getInitialProjects,
  logAndResetPomodoro,
  resetPomodoro,
  toPomodoroState,
  toProjectsState,
} from './utils/misc'

/**
 * Caches the state of the current Pomodoro to localStorage
 *
 * @param {Object} pomodoro The Pomodoro object to cache
 * @param {number} pomodoro.cycle The current active Pomodoro cycle
 * @param {number} pomodoro.duration The total duration of the Pomodoro
 * @param {string} pomodoro.project The project name for the Pomodoro
 * @param {number} pomodoro.remaining The time till Pomodoro is completed
 * @returns Action
 * @memberof ActionCreators
 */
export function cachePomodoro(pomodoro) {
  return {
    type: 'CACHE_POMODORO',
    pomodoro,
  }
}

/**
 * Archives the current active Pomodoro to the log
 *
 * @param {Object} pomodoro The Pomodoro object to cache
 * @param {number} pomodoro.cycle The current active Pomodoro cycle
 * @param {number} pomodoro.duration The total duration of the Pomodoro
 * @param {string} pomodoro.project The project name for the Pomodoro
 * @param {number} pomodoro.remaining The time till Pomodoro is completed
 * @param {boolean} shouldLog Whether the Pomodoro should be written to the log
 * @returns Action
 * @memberof ActionCreators
 */
export function completePomodoro(pomodoro, shouldLog) {
  return {
    type: 'COMPLETE_POMODORO',
    pomodoro,
    shouldLog,
  }
}

/**
 * Stores a Material Design dialog to state so other components may show it
 *
 * @param {Element} dialog HTML Element of Material Dialog component
 * @returns Action
 * @memberof ActionCreators
 */
export function setDialog(dialog) {
  return {
    type: 'SET_DIALOG',
    dialog,
  }
}

/**
 * Sets the currently selected projects on the state
 *
 * @param {string} project The project name string to set
 * @returns Action
 * @memberof ActionCreators
 */
export function setProject(project) {
  return {
    type: 'SET_PROJECT',
    project,
  }
}

/**
 * Sets a projects string array on the state
 *
 * @param {Array} projects The array of project name strings
 * @returns Action
 * @memberof ActionCreators
 */
export function setProjects(projects) {
  return {
    type: 'SET_PROJECTS',
    projects,
  }
}

const ACTIONS = {
  CACHE_POMODORO: (state, { pomodoro }) => ({
    ...state,
    pomodoro: toPomodoroState(pomodoro),
  }),

  COMPLETE_POMODORO: (state, { pomodoro, shouldLog }) => ({
    ...state,
    pomodoro: shouldLog
      ? logAndResetPomodoro(pomodoro)
      : resetPomodoro(pomodoro),
    logs: shouldLog ? aggregateLogsByProject() : state.logs,
  }),

  SET_DIALOG: (state, { dialog }) => ({
    ...state,
    dialog,
  }),

  SET_PROJECT: (state, { project }) => ({
    ...state,
    pomodoro: { ...state.pomodoro, project },
  }),

  SET_PROJECTS: (state, { projects }) => ({
    ...state,
    projects: toProjectsState(projects),
  }),
}

const INITIAL = {
  dialog: null,
  logs: aggregateLogsByProject(),
  pomodoro: getInitialPomodoro(),
  projects: getInitialProjects(),
}

export const reducer = (state = INITIAL, action) =>
  action && ACTIONS[action.type] ? ACTIONS[action.type](state, action) : state

export default createStore(
  reducer,
  undefined,
  typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__
    ? window.__REDUX_DEVTOOLS_EXTENSION__()
    : undefined
)
