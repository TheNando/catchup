import { h, Component } from 'preact'
import { Router } from 'preact-router'

import { Provider } from 'preact-redux'
import store from '../store'

import Header from './header'
import Redirect from './redirect'
import Home from '../routes/home'
import Profile from '../routes/profile'

export default class App extends Component {
  /**
   * Sets the current Url
   *
   * @param {Object} event "change" event from [preact-router](http://git.io/preact-router)
   * @param {string} event.url	The newly routed URL
   * @memberof App
   */
  setUrl = e => this.setState({ currentUrl: e.url })

  render() {
    return (
      <Provider store={store}>
        <div id="app">
          <Header selectedRoute={this.state.currentUrl} />
          <Router onChange={this.setUrl}>
            <Home path="/" />
            <Profile path="/profile/" user="me" />
            <Profile path="/profile/:user" />
            <Redirect default to="/" />
          </Router>
        </div>
      </Provider>
    )
  }
}
