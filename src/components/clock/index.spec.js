import { h } from 'preact'
import { Provider } from 'preact-redux'
import configureMockStore from 'redux-mock-store'
import { deep } from 'preact-render-spy'
import ConnectedClock, { Clock } from './index'

const pomodoro = {
  project: '1',
  duration: 1234,
  remaining: 1234,
}
const projects = ['1', '2']

const props = {
  pomodoro,
  projects,
  cachePomodoro: jest.fn(),
  completePomodoro: jest.fn(),
  setProject: jest.fn(),
}

const store = configureMockStore()({ dialog: {}, pomodoro, projects })

describe('Clock', () => {
  it('shows the time', () => {
    const context = deep(<Clock {...props} />)
    expect(context.find('#remaining').text()).toBe('20:34')
  })

  it('sets the selected project', () => {
    const context = deep(<Clock {...props} />)
    const mockEvent = { target: { selectedIndex: 2 } }
    expect(context.state().projectIndex).toEqual(1)
    context.find('select').simulate('change', mockEvent)
    expect(context.state().projectIndex).toEqual(2)
  })
})

describe('ConnectedClock', () => {
  it('receives projects from provider', () => {
    const context = deep(
      <Provider store={store}>
        <ConnectedClock />
      </Provider>
    )
    expect(context.output()).toMatchSnapshot()
  })
})
