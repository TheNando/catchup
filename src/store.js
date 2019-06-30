import { createStore } from 'redux'
import Storage from './utils/storage'
import { sortDefaultFirst } from './utils/misc'

/**
 * Stores a Material Design dialog to state so other components may show it
 *
 * @export
 * @param {Object} dialog
 * @returns Object
 */
export function setDialog(dialog) {
  return {
    type: 'SET_DIALOG',
    dialog,
  }
}

/**
 * Sets a projects string array on the state
 *
 * @export
 * @param {Array} dialog
 * @returns Object
 */
export function setProjects(projects) {
  return {
    type: 'SET_PROJECTS',
    projects,
  }
}

const ACTIONS = {
  SET_DIALOG: (state, { dialog }) => ({
    ...state,
    dialog,
  }),

  SET_PROJECTS: (state, { projects }) => {
    projects = sortDefaultFirst(projects)
    Storage.set('projects', projects)
    return {
      ...state,
      projects,
    }
  },
}

const projects = Storage.get('projects') || []

const INITIAL = {
  dialog: null,
  projects: projects.length ? projects : ['Default'],
}

export const reducer = (state = INITIAL, action) =>
  action && ACTIONS[action.type] ? ACTIONS[action.type](state, action) : state

export default createStore(
  reducer,
  undefined,
  window.__REDUX_DEVTOOLS_EXTENSION__
    ? window.__REDUX_DEVTOOLS_EXTENSION__()
    : undefined
)
