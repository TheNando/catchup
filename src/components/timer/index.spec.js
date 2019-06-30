import { h } from 'preact'
import { deep } from 'preact-render-spy'
import Timer from './index'

describe('Timer', () => {
  it('renders the component with a default start', () => {
    const context = deep(<Timer />)
    expect(context.output()).toMatchSnapshot()
  })

  it('shows the start time', () => {
    let context = deep(<Timer start="00:05" />)

    expect(context.find('#remaining').text()).toBe('0:05')

    context = deep(<Timer start="50:45" />)
    expect(context.find('#remaining').text()).toBe('50:45')
  })
})
