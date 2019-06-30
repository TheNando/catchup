import { h, Component } from 'preact'
import { connect } from 'preact-redux'

import Nav from '../nav'
import Settings from '../settings'

import TopAppBar from 'preact-material-components/TopAppBar'
import 'preact-material-components/TopAppBar/style.css'

import css from './style.css'

export class Header extends Component {
  openNav = () => (this.nav.open = true)
  setNavRef = nav => (this.nav = nav.drawer.MDComponent)

  render({ dialog, selectedRoute }) {
    return (
      <div>
        {/* Top App Bar */}
        <TopAppBar>
          <TopAppBar.Row>
            <TopAppBar.Section align-start>
              <TopAppBar.Icon menu onClick={this.openNav}>
                menu
              </TopAppBar.Icon>
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
              <TopAppBar.Icon>settings</TopAppBar.Icon>
            </TopAppBar.Section>
          </TopAppBar.Row>
        </TopAppBar>

        <Nav ref={this.setNavRef} route={selectedRoute} />
        <Settings />
      </div>
    )
  }
}

export default connect(state => state)(Header)
