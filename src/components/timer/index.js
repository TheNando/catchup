import { h, Component } from 'preact'

import Select from 'preact-material-components/Select'
import 'preact-material-components/List/style.css'
import 'preact-material-components/Menu/style.css'
import 'preact-material-components/Select/style.css'

import IconButton from 'preact-material-components/IconButton'
import Icon from 'preact-material-components/Icon'
import 'preact-material-components/IconButton/style.css'

import css from './style.css'

export default class Timer extends Component {
  render() {
    return (
      <div class={css.content}>
        <div class={css.timer}>45:00</div>

        <Select
          class={css.select}
          hintText="Project"
          outlined={true}
          box={false}
          selectedIndex={this.state.chosenIndex}
          onChange={e => this.setState({ chosenIndex: e.target.selectedIndex })}
        >
          <Select.Item>opt1</Select.Item>
          <Select.Item>opt2</Select.Item>
          <Select.Item>opt3</Select.Item>
          <Select.Item>opt4</Select.Item>
        </Select>

        <div class={css.actions}>
          <IconButton>
            <Icon class={css.large}>highlight_off</Icon>
          </IconButton>
          <IconButton>
            <IconButton.Icon class={css.large}>
              play_circle_outline
            </IconButton.Icon>
            <IconButton.Icon on class={css.large}>
              pause_circle_outline
            </IconButton.Icon>
          </IconButton>
          <IconButton>
            <Icon class={css.large}>check_circle_outline</Icon>
          </IconButton>
        </div>
      </div>
    )
  }
}
