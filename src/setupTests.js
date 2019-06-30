import { h } from 'preact'

// Browser mocks
Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
  },
})

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
