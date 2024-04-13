import { formatLength } from './formatLengthMovie'

describe('formatLength', () => {
  test('correctly formats length under 1 hour', () => {
    expect(formatLength(45)).toBe('0 часов 45 минут')
  })

  test('correctly formats length for 1 hour', () => {
    expect(formatLength(60)).toBe('1 час 0 минут')
  })

  test('correctly formats length for multiple hours', () => {
    expect(formatLength(125)).toBe('2 часа 5 минут')
  })

  test('correctly formats length for multiple hours with different minutes', () => {
    expect(formatLength(185)).toBe('3 часа 5 минут')
  })

  test('correctly formats length for numbers resulting in "часов" and "минут"', () => {
    expect(formatLength(720)).toBe('12 часов 0 минут')
  })

  test('correctly formats length for "часов" and "минуты"', () => {
    expect(formatLength(122)).toBe('2 часа 2 минуты')
  })

  test('correctly formats length using edge cases for hours', () => {
    expect(formatLength(360)).toBe('6 часов 0 минут')
    expect(formatLength(21)).toBe('0 часов 21 минута')
    expect(formatLength(22)).toBe('0 часов 22 минуты')
    expect(formatLength(25)).toBe('0 часов 25 минут')
  })

  test('correctly formats length of zero minutes', () => {
    expect(formatLength(0)).toBe('0 часов 0 минут')
  })
})
