let PORT = 8845

let http = require('http')
let fs = require('fs')
let url = require('url')

http
  .createServer(function (request, response) {
    let parsedURL = url.parse(request.url, true)
    let pathname = parsedURL.pathname
    console.log(pathname)
    if (pathname === '/event-source-poly-fill') {
      response.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
        // 设置允许跨域的域名，* 代表允许任意域名跨域
        'Access-Control-Allow-Origin': '*',
        // 允许的header类型
        'Access-Control-Allow-Headers': 'Content-Type,Access-Token',
        // 跨域允许的请求方式
        'Access-Control-Allow-Methods': 'DELETE,PUT,POST,GET,OPTIONS'
      })

      let padding = new Array(2049)
      response.write(':' + padding.join(' ') + '\n') // 2kB padding for IE
      response.write('retry: 2000\n')

      let lastEventId = Number(request.headers['last-event-id']) || Number(parsedURL.query.lastEventId) || 0

      let timeoutId = 0
      let i = lastEventId
      let c = i + 100
      let f = function () {
        if (++i < c) {
          response.write('id: ' + i + '\n')
          response.write('data: ' + i + '\n\n')
          timeoutId = setTimeout(f, 1000)
        } else {
          response.end()
        }
      }

      f()

      response.on('close', function () {
        clearTimeout(timeoutId)
      })
    } else {
      if (pathname === '/') {
        pathname = '/index.html'
      }
      if (pathname === '/index.html' || pathname === '../src/eventsource.js') {
        response.writeHead(200, {
          'Content-Type': pathname === '/index.html' ? 'text/html' : 'text/javascript'
        })
        response.write(fs.readFileSync(__dirname + pathname))
      }
      response.end()
    }
  })
  .listen(PORT)
