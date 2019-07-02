import { h, Component } from 'preact'
import { connect } from 'preact-redux'

import Select from 'preact-material-components/Select'
import 'preact-material-components/List/style.css'
import 'preact-material-components/Menu/style.css'
import 'preact-material-components/Select/style.css'

import IconButton from 'preact-material-components/IconButton'
import Icon from 'preact-material-components/Icon'
import 'preact-material-components/IconButton/style.css'

import {
  DEFAULT_LONG_BREAK,
  DEFAULT_SHORT_BREAK,
  MAX_CYCLES,
} from '../../utils/constants'
import { cachePomodoro, completePomodoro, setProject } from '../../store'
import { secondsToString, Timer } from '../../utils/time'

import css from './style.css'

export class Clock extends Component {
  timer = null

  constructor(props) {
    super(props)
    this.configureTimer()
  }

  /**
   * Compares the number of seconds to remaining and updates if differing
   *
   * @param {number} secs The number of seconds to compare with
   * @memberof Clock
   */
  checkTime = (secs, isActive = true) => {
    isActive &&
      !this.state.isBreak &&
      this.props.cachePomodoro(this.makePomodoro())
    if (secs !== this.state.remaining || !isActive) {
      this.setState({ remaining: secs, isActive })
    }
  }

  /**
   * Initialize timer logic
   *
   * @memberof Clock
   */
  configureTimer() {
    const {
      pomodoro: { duration, project, remaining },
      cachePomodoro,
      completePomodoro,
      projects = [],
    } = this.props

    this.state = {
      isActive: false,
      isBreak: false,
      breakType: '',
      isResuming: duration !== remaining,
      projectIndex:
        // Select input has an empty item so projectIndex is off by one
        // Math.max ensures that at Default is selected
        Math.max(projects.findIndex(item => item === project), 0) + 1,
      remaining,
    }

    const start = () => {
      const isResuming = this.state.isResuming

      this.timer = new Timer(duration, {
        elapsed: duration - remaining,
        onTick: this.checkTime,
        onPause: pause,
        onResume: resume,
        onDone: done,
      })

      this.setState({ isActive: false, isBreak: false, isResuming })
    }

    const startBreak = () => {
      const breakType = this.props.pomodoro.cycle === 4 ? 'long' : 'short'

      const breakTime =
        breakType === 'short' ? DEFAULT_SHORT_BREAK : DEFAULT_LONG_BREAK

      this.timer = new Timer(breakTime, {
        onTick: this.checkTime,
        onDone: start,
      })
      this.timer.resume()

      this.setState({
        breakType,
        isActive: false,
        isBreak: true,
        isResuming: false,
      })
    }

    const pause = () => {
      cachePomodoro(this.makePomodoro())
      this.setState({ isActive: false, isResuming: false })
    }

    const resume = () => this.setState({ isResuming: false })

    const done = shouldLog => {
      completePomodoro(this.makePomodoro(), shouldLog)
      if (shouldLog) {
        startBreak()
      } else {
        start()
      }

      this.setState({ isActive: false, isResuming: false })
    }

    start()
  }

  /**
   * Construct a cacheable pomodoro with the current state and time remaining
   *
   * @memberof Clock
   * @returns Object
   */
  makePomodoro = () => {
    const { ...pomodoro } = this.props.pomodoro
    const { remaining } = this.state
    return { ...pomodoro, remaining }
  }

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

  render(
    { projects, pomodoro },
    { breakType, isActive, isBreak, isResuming, projectIndex, remaining }
  ) {
    const { timer } = this
    const showAll = isActive || pomodoro.duration !== pomodoro.remaining

    // Break content
    if (isBreak) {
      return (
        <div class={css.content}>
          <span class={css.resuming}>Time for a {breakType} break!</span>
          <div id="remaining" class={css.timer}>
            {secondsToString(remaining)}
          </div>

          <div class={css.actionBlock}>
            <IconButton onClick={timer.complete}>
              <Icon class="icon-button-large">check_circle_outline</Icon>
            </IconButton>
            <span class={css.actionLabel}>Finish Break</span>
          </div>
        </div>
      )
    }

    // Pomodoro Content
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

        {isResuming && <span class={css.resuming}>Resuming session</span>}

        {showAll && (
          <span class={css.cycle}>
            Cycle {pomodoro.cycle} of {MAX_CYCLES}
          </span>
        )}

        <div class={css.actions}>
          <div class={css.actionBlock}>
            <IconButton onClick={isActive ? timer.pause : timer.resume}>
              <Icon class="icon-button-large">
                {isActive ? 'pause_circle_outline' : 'play_circle_outline'}
              </Icon>
            </IconButton>
            <span class={css.actionLabel}>
              {isActive ? 'Pause' : showAll ? 'Resume' : 'Start'}
            </span>
          </div>

          {/* Only slow Reset button when mid-Pomodoro */}
          {showAll && (
            <div class={css.actionBlock}>
              <IconButton onClick={timer.reset}>
                <Icon class="icon-button-large">highlight_off</Icon>
              </IconButton>
              <span class={css.actionLabel}>Reset</span>
            </div>
          )}

          {/* Only slow Complete button when mid-Pomodoro */}
          {showAll && (
            <div class={css.actionBlock}>
              <IconButton onClick={timer.complete}>
                <Icon class="icon-button-large">check_circle_outline</Icon>
              </IconButton>
              <span class={css.actionLabel}>Complete</span>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default connect(
  state => state,
  { cachePomodoro, completePomodoro, setProject }
)(Clock)
