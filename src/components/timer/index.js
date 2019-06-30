import { h, Component } from 'preact'
import { connect } from 'preact-redux'

import Select from 'preact-material-components/Select'
import 'preact-material-components/List/style.css'
import 'preact-material-components/Menu/style.css'
import 'preact-material-components/Select/style.css'

import IconButton from 'preact-material-components/IconButton'
import Icon from 'preact-material-components/Icon'
import 'preact-material-components/IconButton/style.css'

import { parseTime, secondsToString } from '../../utils/time'

import css from './style.css'

export class Timer extends Component {
  constructor(props) {
    super(props)
    this.state = { active: false, projectIndex: 1, remaining: 0 }
  }

  componentDidMount() {
    this.setState({ remaining: parseTime(this.props.start) })
  }

  /**
   * Set the selected index of the project select input
   *
   * @memberof Timer
   */
  selectIndex = e => this.setState({ projectIndex: e.target.selectedIndex })

  render({ projects }, state) {
    return (
      <div class={css.content}>
        <div id="remaining" class={css.timer}>
          {secondsToString(state.remaining)}
        </div>

        <Select
          class={css.select}
          hintText="Project"
          outlined={true}
          box={false}
          selectedIndex={this.state.projectIndex}
          onChange={this.selectIndex}
        >
          {projects.map(item => (
            <Select.Item>{item}</Select.Item>
          ))}
        </Select>

        <div class={css.actions}>
          <IconButton>
            <Icon class="icon-button-large">highlight_off</Icon>
          </IconButton>
          <IconButton>
            <IconButton.Icon class="icon-button-large">
              play_circle_outline
            </IconButton.Icon>
            <IconButton.Icon on class="icon-button-large">
              pause_circle_outline
            </IconButton.Icon>
          </IconButton>
          <IconButton>
            <Icon class="icon-button-large">check_circle_outline</Icon>
          </IconButton>
        </div>
      </div>
    )
  }
}

Timer.defaultProps = { start: '25:00' }

export default connect(({ projects }) => ({ projects }))(Timer)
