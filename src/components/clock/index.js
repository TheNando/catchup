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
import { cachePomodoro } from '../../store'

import css from './style.css'

export class Clock extends Component {
  timer = null

  constructor(props) {
    super(props)
    const {
      pomodoro: { cycle, duration, project, remaining },
      cachePomodoro,
      projects = [],
    } = this.props

    this.state = {
      active: false,
      projectIndex:
        // Select input has an empty item so projectIndex is off by one
        // Math.max ensures that at Default is selected
        Math.max(projects.findIndex(item => item === project), 0) + 1,
      remaining,
    }

    const pause = remaining => {
      cachePomodoro({ cycle, duration, project, remaining })
      this.setState({ active: !this.state.active })
    }

    this.timer = this.createTimer(duration, remaining, this.checkTime, pause)
  }

  /**
   * Compares the number of seconds to remaining and updates if differing
   *
   * @param {number} secs The number of seconds to compare with
   * @memberof Clock
   */
  checkTime = secs =>
    secs !== this.state.remaining && this.setState({ remaining: secs })

  /**
   * Create a Timer and cache a Pomodoro to state
   *
   * @memberof Clock
   */
  createTimer = (duration, remaining, onTick, onPause) => {
    return new Timer(duration, {
      autoStart: duration === remaining,
      elapsed: duration - remaining,
      onTick,
      onPause,
      // onDone: noop,
    })
  }

  /**
   * Sets the selected index of the project select input
   *
   * @param {Object} event "change" event from project select input
   * @memberof Clock
   */
  selectIndex = e => this.setState({ projectIndex: e.target.selectedIndex })

  render({ projects, pomodoro }, { projectIndex, remaining }) {
    const { timer } = this
    const showAll = timer.isActive || pomodoro.duration !== pomodoro.remaining

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
            <IconButton>
              <Icon class="icon-button-large">highlight_off</Icon>
            </IconButton>
          )}

          <IconButton onClick={timer.isActive ? timer.pause : timer.resume}>
            <Icon class="icon-button-large">
              {timer.isActive ? 'pause_circle_outline' : 'play_circle_outline'}
            </Icon>
          </IconButton>

          {/* Only slow Complete button when mid-Pomodoro */}
          {showAll && (
            <IconButton>
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
  { cachePomodoro }
)(Clock)
