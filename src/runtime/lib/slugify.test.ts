import { slugify } from './slugify'

describe('slugify', () => {
  it('should convert a string to a slug', () => {
    expect(slugify('Hello World!')).toBe('hello-world')
    expect(slugify('This is a test')).toBe('this-is-a-test')
    expect(slugify('Slugify Test 123')).toBe('slugify-test-123')
    expect(slugify('Special characters !@#$%^&*()')).toBe('special-characters')
    expect(slugify('Multiple   spaces')).toBe('multiple-spaces')
  })

  it('should handle empty strings', () => {
    expect(slugify('')).toBe('')
  })

  it('should handle strings with only special characters', () => {
    expect(slugify('!@#$%^&*()')).toBe('')
  })
})
