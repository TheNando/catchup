import { h } from 'preact'
import { shallow } from 'preact-render-spy'
import Home from './index'

test('renders the home component', () => {
  const context = shallow(<Home />)
  expect(context.output()).toMatchSnapshot()
})
