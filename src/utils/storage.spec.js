import Storage from './storage'

describe('Storage', () => {
  afterEach(() => {
    Storage.clear()
    localStorage.getItem.mockReset()
    localStorage.setItem.mockReset()
    localStorage.clear.mockReset()
  })

  it('caches value on first read', () => {
    localStorage.getItem.mockReturnValue('3.14')

    expect(Storage.get('test')).toEqual(3.14)
    expect(localStorage.getItem).toHaveBeenCalled()
  })

  it('does not cache value on subsequent reads', () => {
    localStorage.getItem.mockReturnValue('3.14')

    expect(Storage.get('test')).toEqual(3.14)
    expect(localStorage.getItem).toHaveBeenCalled()

    localStorage.getItem.mockClear()
    expect(Storage.get('test')).toEqual(3.14)
    expect(localStorage.getItem).not.toHaveBeenCalled()
  })

  it('sets the value on local storage', () => {
    Storage.set('test', 3.14)
    expect(localStorage.setItem).toHaveBeenCalledWith('test', '3.14')
  })

  it('clears all values', () => {
    Storage.set('pi', Math.PI)
    Storage.set('e', Math.E)

    expect(Storage.get('pi')).toEqual(Math.PI)
    expect(Storage.get('e')).toEqual(Math.E)

    Storage.clear()
    expect(localStorage.clear).toHaveBeenCalled()
    expect(Storage.get('pi')).toBeNull()
    expect(Storage.get('e')).toBeNull()
  })
})
