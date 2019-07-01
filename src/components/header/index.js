import { h, Component } from 'preact'
import { connect } from 'preact-redux'

import Settings from '../settings'

import TopAppBar from 'preact-material-components/TopAppBar'
import 'preact-material-components/TopAppBar/style.css'

import logoImage from '../../assets/tomato.png'
import css from './style.css'

const logoStyle = {
  'background-image': `url(${logoImage})`,
}

export class Header extends Component {
  render({ dialog, selectedRoute }) {
    return (
      <div>
        {/* Top App Bar */}
        <TopAppBar>
          <TopAppBar.Row>
            <TopAppBar.Section align-start>
              <div class={css.logo} style={logoStyle} />
              <TopAppBar.Title>
                <span>CatchUp!</span>
                &nbsp;
                <span class={css.subtitle}>A Pomodoro Time Tracker</span>
              </TopAppBar.Title>
            </TopAppBar.Section>
            <TopAppBar.Section
              align-end
              shrink-to-fit
              onClick={() => dialog.MDComponent.show()}
            >
              <TopAppBar.Icon class="pointer">settings</TopAppBar.Icon>
            </TopAppBar.Section>
          </TopAppBar.Row>
        </TopAppBar>

        <Settings />
      </div>
    )
  }
}

export default connect(state => state)(Header)
