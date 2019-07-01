import { h, Component } from 'preact'
import { connect } from 'preact-redux'

import Select from 'preact-material-components/Select'
import 'preact-material-components/List/style.css'
import 'preact-material-components/Menu/style.css'
import 'preact-material-components/Select/style.css'

import IconButton from 'preact-material-components/IconButton'
import Icon from 'preact-material-components/Icon'
import 'preact-material-components/IconButton/style.css'

import { secondsToString, Timer } from '../../utils/time'
import { cachePomodoro, completePomodoro, setProject } from '../../store'

import css from './style.css'

export class Clock extends Component {
  timer = null

  constructor(props) {
    super(props)
    const {
      pomodoro: { duration, project, remaining },
      cachePomodoro,
      completePomodoro,
      projects = [],
    } = this.props

    this.state = {
      isActive: false,
      projectIndex:
        // Select input has an empty item so projectIndex is off by one
        // Math.max ensures that at Default is selected
        Math.max(projects.findIndex(item => item === project), 0) + 1,
      remaining,
    }

    const makePomodoro = () => {
      const { ...pomodoro } = this.props.pomodoro
      const { remaining } = this.state
      return { ...pomodoro, remaining }
    }

    const start = () => {
      this.timer = new Timer(duration, {
        elapsed: duration - remaining,
        onTick: this.checkTime,
        onPause: pause,
        onDone: done,
      })
      this.setState()
    }

    const pause = () => {
      cachePomodoro(makePomodoro())
      this.setState({ isActive: false })
    }

    const done = () => {
      completePomodoro(makePomodoro())
      start()
      this.setState({ isActive: false })
    }

    start()
  }

  /**
   * Compares the number of seconds to remaining and updates if differing
   *
   * @param {number} secs The number of seconds to compare with
   * @memberof Clock
   */
  checkTime = (secs, isActive = true) =>
    (secs !== this.state.remaining || !isActive) &&
    this.setState({ remaining: secs, isActive })

  /**
   * Sets the selected index of the project select input
   *
   * @param {Object} event "change" event from project select input
   * @memberof Clock
   */
  selectIndex = e => {
    this.setState({ projectIndex: e.target.selectedIndex })
    this.props.setProject(e.target.value)
  }

  render({ projects, pomodoro }, { isActive, projectIndex, remaining }) {
    const { timer } = this
    const showAll = isActive || pomodoro.duration !== pomodoro.remaining

    return (
      <div class={css.content}>
        <div id="remaining" class={css.timer}>
          {secondsToString(remaining)}
        </div>

        <Select
          class={css.select}
          disabled={showAll}
          hintText="Project"
          outlined={true}
          box={false}
          selectedIndex={projectIndex}
          onChange={this.selectIndex}
        >
          {projects.map(item => (
            <Select.Item>{item}</Select.Item>
          ))}
        </Select>

        <div class={css.actions}>
          {/* Only slow Reset button when mid-Pomodoro */}
          {showAll && (
            <IconButton onClick={timer.reset}>
              <Icon class="icon-button-large">highlight_off</Icon>
            </IconButton>
          )}

          <IconButton onClick={isActive ? timer.pause : timer.resume}>
            <Icon class="icon-button-large">
              {isActive ? 'pause_circle_outline' : 'play_circle_outline'}
            </Icon>
          </IconButton>

          {/* Only slow Complete button when mid-Pomodoro */}
          {showAll && (
            <IconButton onClick={timer.complete}>
              <Icon class="icon-button-large">check_circle_outline</Icon>
            </IconButton>
          )}
        </div>
      </div>
    )
  }
}

export default connect(
  ({ pomodoro, projects }) => ({ pomodoro, projects }),
  { cachePomodoro, completePomodoro, setProject }
)(Clock)
