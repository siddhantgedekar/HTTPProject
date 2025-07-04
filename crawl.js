const { JSDOM } = require('jsdom')

// crawl page
async function crawlPage(currentURL) {
    console.log("actively crawling: "+currentURL)
    try{
        const resp = await fetch(currentURL)
        // check if response is valid?
        if(resp.status > 399) {
            console.log(`error in fetch with status code: ${resp.status} on page: ${currentURL}`)
            return;
        }

        // check if response contains valid html
        const contentType = resp.headers.get('content-type')
        if(!contentType.includes("text/html")) {
            console.log(`Non html response, content type: ${contentType}, on page: ${currentURL}`)
            return
        }

        console.log(await resp.text())
    } catch(err) {
        console.log(`error in fetch. ${err.message}, on page: ${currentURL}`)
    }
}
// fetch websites

function getURLFromHTML(htmlBody, BaseURL) {
    const urls = []
    // convert string html body to a JS dom object
    // that can be represented as an actual HTML dom in browser, stored in local machine
    const dom = new JSDOM(htmlBody)
    // this way we got all the links in array
    const linkElements = dom.window.document.querySelectorAll('a')
    for(const links of linkElements) {
        if(links.href.slice(0,1) === '/'){
            try {
                // relative
                const urlObj = new URL(`${BaseURL}${links.href}`)
                urls.push(urlObj.href)
                
            } catch (error) {
                console.log(`Error with relative url: ${error.message}`)
            }
        } else {
            try {
                // absolute
                const urlObj = new URL(links.href)
                urls.push(urlObj.href)
                
            } catch (error) {
                console.log(`Error with absolute url: ${error.message}`)
            }
        }

    }
    return urls
}

function normalizeURL(urlString) {
    const urlObj = new URL(urlString)
    const hostpath = `${urlObj.hostname}${urlObj.pathname}`
    if(hostpath.length > 0 && hostpath.slice(-1) == '/')
        return hostpath.slice(0, -1)
}

module.exports = {
    normalizeURL,
    getURLFromHTML,
    crawlPage
}