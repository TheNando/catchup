import { h } from 'preact'
import { deep } from 'preact-render-spy'
import Timer from './index'

test('renders the home component', () => {
  const context = deep(<Timer />)
  expect(context.output()).toMatchSnapshot()
})
