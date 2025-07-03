const {normalizeURL} = require('./crawl.js')
const { test, expect } = require('@jest/globals')

test('normalizeURL strip protocol', () => {
    // thinking input
    const input = 'https://blog.boot.dev/path/'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})
test('normalizeURL strip trailing slash', () => {
    // thinking input
    const input = 'https://blog.boot.dev/path/'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})
test('normalizeURL capitals', () => {
    // thinking input
    const input = 'https://BLOG.boot.dev/path/'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})
test('normalizeURL strip http', () => {
    // thinking input
    const input = 'http://blog.boot.dev/path/'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})