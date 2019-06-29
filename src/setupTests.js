import { h } from 'preact'

jest.mock('preact-material-components/Icon', () =>
  jest.fn().mockImplementation(props => <i {...props} />)
)

jest.mock('preact-material-components/IconButton', () => {
  const main = jest.fn().mockImplementation(props => <button {...props} />)
  main.Icon = jest.fn().mockImplementation(props => <i {...props} />)
  return main
})

jest.mock('preact-material-components/Select', () => {
  const main = jest.fn().mockImplementation(props => <select {...props} />)
  main.Item = jest.fn().mockImplementation(props => <option {...props} />)
  return main
})
