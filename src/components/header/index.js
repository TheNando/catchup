import { h, Component } from 'preact'
import Nav from '../nav'
import Settings from '../settings'
import TopAppBar from 'preact-material-components/TopAppBar'
import 'preact-material-components/TopAppBar/style.css'
import css from './style.css'

export default class Header extends Component {
  navRef = nav => (this.nav = nav.drawer.MDComponent)
  openNav = () => (this.nav.open = true)

  settingsRef = settings => (this.settings = settings.dialog.MDComponent)
  openSettings = () => this.settings.show()

  render(props) {
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
              onClick={this.openSettings}
            >
              <TopAppBar.Icon>settings</TopAppBar.Icon>
            </TopAppBar.Section>
          </TopAppBar.Row>
        </TopAppBar>

        <Nav ref={this.navRef} route={props.selectedRoute} />

        <Settings ref={this.settingsRef} />
      </div>
    )
  }
}
