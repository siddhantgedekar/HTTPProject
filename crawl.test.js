const { normalizeURL, getURLFromHTML } = require('./crawl.js')
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
test('getURLFromHTML absoluteURL', () => {
    // thinking input
    const inputHTMLBody = "<html> <body> <a href='https://blog.boot.dev/' >Boot.dev Blog</a> </body> </html>"
    const inputBaseURL = "https://blog.boot.dev/"
    const actual = getURLFromHTML(inputHTMLBody, inputBaseURL)
    // all links to be returned as array of strings
    const expected = ['https://blog.boot.dev/']
    expect(actual).toEqual(expected)
})
// relative url doesn't include domain and protocol. Only path
test('getURLFromHTML relativeURL', () => {
    // thinking input
    const inputHTMLBody = "<html> <body> <a href='/path/' >Boot.dev Blog</a> </body> </html>"
    const inputBaseURL = "https://blog.boot.dev"
    const actual = getURLFromHTML(inputHTMLBody, inputBaseURL)
    // all links to be returned as array of strings
    const expected = ['https://blog.boot.dev/path/']
    expect(actual).toEqual(expected)
})
// absolute and relative both
test('getURLFromHTML both', () => {
    // thinking input
    const inputHTMLBody = "<html> <body> <a href='https://blog.boot.dev/path1/' >Boot.dev Blog Path One</a> <a href='/path2/'</a> </body> </html>"
    const inputBaseURL = "https://blog.boot.dev"
    const actual = getURLFromHTML(inputHTMLBody, inputBaseURL)
    // all links to be returned as array of strings
    const expected = ['https://blog.boot.dev/path1/','https://blog.boot.dev/path2/']
    expect(actual).toEqual(expected)
})
test('getURLFromHTML invalid', () => {
    // thinking input
    const inputHTMLBody = "<html> <body> <a href='invalid' >Invalid url</a> </body> </html>"
    const inputBaseURL = "https://blog.boot.dev/"
    const actual = getURLFromHTML(inputHTMLBody, inputBaseURL)
    // all links to be returned as array of strings
    const expected = []
    expect(actual).toEqual(expected)
})