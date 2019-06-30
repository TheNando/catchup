import { parseTime, secondsToString, toPadded } from './time'

describe('parseTime', () => {
  it('parses the time', () => {
    expect(parseTime('12:00')).toEqual(720)
    expect(parseTime('10:30')).toEqual(630)
  })

  it('only accepts mins in range', () => {
    expect(() => parseTime('-12:00')).toThrow()
    expect(() => parseTime('123:00')).toThrow()
  })

  it('only accepts secs in range', () => {
    expect(() => parseTime('2:-01')).toThrow()
    expect(() => parseTime('3:61')).toThrow()
  })

  it('accepts a max of 60:00', () => {
    expect(parseTime('60:00')).toEqual(3600)
    expect(() => parseTime('60:01')).toThrow()
  })
})

describe('secondsToString', () => {
  it('converts number of seconds into time string', () => {
    expect(secondsToString(13)).toEqual('0:13')
    expect(secondsToString(130)).toEqual('2:10')
    expect(secondsToString(1300)).toEqual('21:40')
    expect(secondsToString(13000)).toEqual('216:40')
  })
})

describe('toPadded', () => {
  it('converts number to padded string', () => {
    expect(toPadded(5)).toEqual('05')
  })

  it('only pads two places', () => {
    expect(toPadded(50)).toEqual('50')
    expect(toPadded(500)).toEqual('500')
  })
})
