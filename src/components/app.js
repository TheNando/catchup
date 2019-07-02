import { h, Component } from 'preact'

import { Provider } from 'preact-redux'
import store from '../store'

import Header from './header'
import Home from '../routes/home'

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
          <Header />
          <Home />
        </div>
      </Provider>
    )
  }
}
