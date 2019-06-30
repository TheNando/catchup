import { sortDefaultFirst } from './misc'

describe('sortDefaultFirst', () => {
  it('places "Default" at front of array', () => {
    expect(sortDefaultFirst(['x', 'a', 'Default', '1'])[0]).toEqual('Default')
  })

  it('sorts the rest of the array', () => {
    const sorted = sortDefaultFirst(['x', 'a', 'Default', '1'])
    expect(sorted[1]).toEqual('1')
    expect(sorted[2]).toEqual('a')
    expect(sorted[3]).toEqual('x')
  })
})
