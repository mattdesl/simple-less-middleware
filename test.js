var less = require('./')
var test = require('tape')
var http = require('http')
var got = require('got')
var path = require('path')

test('a simple LESS middleware for server requests', function (t) {
  t.plan(3)
  var file = path.join(__dirname, 'test.less')
  var cssUrl = 'main.css'

  var server = http.createServer(less(file, cssUrl))
  server.on('error', t.fail.bind(t))
  server.listen(9910, 'localhost', function () {
    got('http://localhost:9910/main.css',
      function (err, body, res) {
        if (err) return t.fail(err)
        t.equal(res.statusCode, 200)
        t.equal(res.headers['content-type'], 'text/css')
        t.equal(body, 'body {\n  background: green;\n}\n')
        server.close()
      })
  })
})
