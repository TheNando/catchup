import { h, Component } from 'preact'
import Dialog from 'preact-material-components/Dialog'
import Switch from 'preact-material-components/Switch'
import 'preact-material-components/Switch/style.css'
import 'preact-material-components/Dialog/style.css'

export default class Settings extends Component {
  dialogRef = dialog => (this.dialog = dialog)

  toggleDarkTheme = () => {
    this.setState(
      {
        darkThemeEnabled: !this.state.darkThemeEnabled,
      },
      () => {
        if (this.state.darkThemeEnabled) {
          document.body.classList.add('mdc-theme--dark')
        } else {
          document.body.classList.remove('mdc-theme--dark')
        }
      }
    )
  }

  render(props) {
    return (
      <Dialog ref={this.dialogRef}>
        <Dialog.Header>Settings</Dialog.Header>
        <Dialog.Body>
          <div>
            Enable dark theme <Switch onClick={this.toggleDarkTheme} />
          </div>
        </Dialog.Body>
        <Dialog.Footer>
          <Dialog.FooterButton accept>OK</Dialog.FooterButton>
        </Dialog.Footer>
      </Dialog>
    )
  }
}
