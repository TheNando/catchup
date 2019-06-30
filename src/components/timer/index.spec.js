import { h } from 'preact'
import { Provider } from 'preact-redux'
import configureMockStore from 'redux-mock-store'
import { deep, shallow } from 'preact-render-spy'
import ConnectedTimer, { Timer } from './index'

const projects = { projects: ['1', '2'] }
const store = configureMockStore()({ ...projects, dialog: {} })

describe('Timer', () => {
  it('renders the component with a default start', () => {
    const context = deep(<Timer {...projects} />)
    expect(context.output()).toMatchSnapshot()
  })

  it('shows the start time', () => {
    let context = deep(<Timer start="00:05" {...projects} />)
    expect(context.find('#remaining').text()).toBe('0:05')

    context = deep(<Timer start="50:45" {...projects} />)
    expect(context.find('#remaining').text()).toBe('50:45')
  })

  it('sets the selected project', () => {
    const context = deep(<Timer start="00:05" {...projects} />)
    const mockEvent = { target: { selectedIndex: 2 } }
    expect(context.state().projectIndex).toEqual(1)
    context.find('select').simulate('change', mockEvent)
    expect(context.state().projectIndex).toEqual(2)
  })
})

describe('ConnectedTimer', () => {
  it('receives projects from provider', () => {
    const context = deep(
      <Provider store={store}>
        <ConnectedTimer />
      </Provider>
    )
    expect(context.output()).toMatchSnapshot()
  })
})
