var filed = require('filed')
var url = require('url')
var less = require('less-css-stream')
var Prefix = require('less-plugin-autoprefix')
var once = require('once')

module.exports = lessMiddleware
function lessMiddleware (lessFile, cssUrl, opts) {
  opts = opts || {}

  var autoprefix = opts.autoprefix
  if (typeof autoprefix === 'string') {
    autoprefix = autoprefix.replace(/\s*,\s*/g, ',').split(',')
  }

  var middleware = function (req, res, next) {
    if (typeof next !== 'function') {
      next = function (err) {
        if (err) {
          res.statusCode = 400
          res.end(err.message)
        }
      }
    }

    if (url.parse(req.url).pathname === '/' + cssUrl) {
      res.setHeader('Content-Type', 'text/css')

      var lessOpts = {
        paths: opts.paths,
        compress: opts.compress,
        plugins: opts.autoprefix
          ? [ new Prefix({ browsers: opts.autoprefix }) ]
          : undefined
      }

      var onError = once(function onError (err) {
        var msg = err.message
        err.message = 'ERROR ' + lessFile + ':\n  ' + msg
        next(err)
      })

      filed(lessFile).on('error', onError)
        .pipe(less(lessFile, lessOpts)).on('error', onError)
        .pipe(res)
    } else {
      next()
    }
  }

  return middleware
}
