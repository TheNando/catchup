import { h, Component } from 'preact'

import { Provider } from 'preact-redux'
import store from '../store'

import Header from 'async!./header'
import Clock from 'async!./clock'

export default class App extends Component {
  render() {
    return (
      <div id="app">
        <Provider store={store}>
          <Header />
          <div class="page">
            <Clock />
          </div>
        </Provider>
      </div>
    )
  }
}
