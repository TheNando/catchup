import { h, Component } from 'preact'
import { route } from 'preact-router'
import Drawer from 'preact-material-components/Drawer'
import List from 'preact-material-components/List'
import 'preact-material-components/Drawer/style.css'
import 'preact-material-components/List/style.css'

export default class Nav extends Component {
  drawerRef = drawer => (this.drawer = drawer)

  openDrawer = () => (this.drawer.MDComponent.open = true)

  closeDrawer() {
    this.drawer.MDComponent.open = false
    this.state = {
      darkThemeEnabled: false,
    }
  }

  linkTo = path => () => {
    route(path)
    this.closeDrawer()
  }

  goHome = this.linkTo('/')
  goToMyProfile = this.linkTo('/profile')

  render(props) {
    return (
      <Drawer modal ref={this.drawerRef}>
        <Drawer.DrawerContent>
          <Drawer.DrawerItem
            selected={props.route === '/'}
            onClick={this.goHome}
          >
            <List.ItemGraphic>home</List.ItemGraphic>
            Home
          </Drawer.DrawerItem>
          <Drawer.DrawerItem
            selected={props.route === '/profile'}
            onClick={this.goToMyProfile}
          >
            <List.ItemGraphic>account_circle</List.ItemGraphic>
            Profile
          </Drawer.DrawerItem>
        </Drawer.DrawerContent>
      </Drawer>
    )
  }
}
