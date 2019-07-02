import { h, Component } from 'preact'
import { connect } from 'preact-redux'

import Dialog from 'preact-material-components/Dialog'
import 'preact-material-components/Dialog/style.css'

import TextField from 'preact-material-components/TextField'
import 'preact-material-components/TextField/style.css'

import Button from 'preact-material-components/Button'
import 'preact-material-components/Button/style.css'

import Typography from 'preact-material-components/Typography'
import 'preact-material-components/Typography/style.css'

import IconButton from 'preact-material-components/IconButton'
import Icon from 'preact-material-components/Icon'
import 'preact-material-components/IconButton/style.css'

import { setProjects, setDialog } from '../../store'
import { aggregateLogsByProject, exportLogsToCsv } from '../../utils/misc'
import { secondsToString } from '../../utils/time'

const minMargin = { 'margin-top': '3px', 'margin-bottom': '3px' }

export class Settings extends Component {
  state = {
    logs: aggregateLogsByProject(),
  }

  /**
   * Adds a project to app state
   *
   * @param {Object} event "keypress" or "click" event
   * @param {string} event.key The key which was pressed
   * @memberof Settings
   */
  addProject = event => {
    if (event.key && event.key !== 'Enter') return

    const nameInput = document.getElementById('projectName') || {}
    const name = (nameInput.value || '').trim()

    let projects = this.props.projects

    // Do not add project name if it already exists (case insensitive)
    if (
      projects.map(items => items.toLowerCase()).includes(name.toLowerCase())
    ) {
      nameInput.value = ''
      return
    }

    this.props.setProjects([...projects, name])

    nameInput.value = ''
  }

  /**
   * Removes a project from app state
   *
   * @param {string} name The new project's name
   * @memberof Settings
   */
  deleteProject = name => {
    const projects = this.props.projects.filter(item => item !== name)
    this.props.setProjects(projects)
  }

  /**
   * Sets dialog on app state so Header config button can open it
   *
   * @param {Element} dialog HTML Element of Material Dialog component
   * @memberof Settings
   */
  setDialogRef = dialog => {
    if (this.props.dialog) return
    this.props.setDialog(dialog)
  }

  render({ projects }, { logs }) {
    return (
      <Dialog ref={this.setDialogRef}>
        <Dialog.Header>Settings</Dialog.Header>
        <Dialog.Body>
          {/* Project Settings */}
          <h2 headline5>Projects</h2>
          <section class="layout-row-halved">
            {/* Add Project */}
            <div class="control-row">
              <TextField
                id="projectName"
                label="Project Name"
                onKeyPress={this.addProject}
              />
              <Button ripple raised onClick={this.addProject}>
                Add
              </Button>
            </div>

            {/* Projects List */}
            <div>
              {projects.map((item, index) => (
                <div class="control-row">
                  <Icon
                    class={index ? 'icon-button' : 'icon-button-default'}
                    onClick={() => index && this.deleteProject(item)}
                  >
                    clear
                  </Icon>
                  <h3 style={minMargin}>
                    {item}
                    {!index && ' (cannot delete)'}
                  </h3>
                </div>
              ))}
            </div>
          </section>

          {/* Logs */}
          <h2 headline5>Logged Pomodoros</h2>
          <section class="layout-row-halved">
            <div>
              {/* None logged */}
              {logs.map.length === 0 && (
                <span>You have no logged Pomodoros</span>
              )}

              {/* Logged Entries Info */}
              {logs.map(({ project, total, entries }) => (
                <div>
                  {`${project} - Total: ${secondsToString(
                    total
                  )}, Entries: ${entries}`}
                </div>
              ))}
            </div>
            <div class="control-row">
              <Button
                ripple
                raised
                disabled={logs.length === 0}
                onClick={exportLogsToCsv}
              >
                Export to CSV
              </Button>
            </div>
          </section>
        </Dialog.Body>
        <Dialog.Footer>
          <Dialog.FooterButton accept>OK</Dialog.FooterButton>
        </Dialog.Footer>
      </Dialog>
    )
  }
}

export default connect(
  state => state,
  { setDialog, setProjects }
)(Settings)
