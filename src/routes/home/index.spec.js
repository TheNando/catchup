import { h } from 'preact'
import { shallow } from 'preact-render-spy'
import Home from './index'

describe('Home', () => {
  it('renders the component', () => {
    const context = shallow(<Home />)
    expect(context.output()).toMatchSnapshot()
  })
})
