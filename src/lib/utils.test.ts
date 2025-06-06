import { cn } from '@/lib/utils'

describe('cn', () => {
  test('merges class names', () => {
    expect(cn('foo', 'bar')).toBe('foo bar')
  })

  test('ignores falsy values', () => {
    expect(cn('foo', false && 'bar', undefined, '', null, 'baz')).toBe('foo baz')
  })

  test('merges tailwind classes', () => {
    expect(cn('p-2', 'p-3')).toBe('p-3')
  })
})
