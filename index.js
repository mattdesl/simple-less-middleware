var filed = require('filed')
var url = require('url')
var less = require('less-css-stream')
var Prefix = require('less-plugin-autoprefix')

module.exports = lessMiddleware
function lessMiddleware (lessFile, cssUrl, opts) {
  opts = opts || {}

  var autoprefix = opts.autoprefix
  if (typeof autoprefix === 'string') {
    autoprefix = autoprefix.replace(/\s*,\s*/g, ',').split(',')
  }

  return function lessRequest (req, res, next) {
    if (url.parse(req.url).pathname === '/' + cssUrl) {
      res.setHeader('Content-Type', 'text/css')

      var lessOpts = {
        paths: opts.paths,
        compress: opts.compress,
        plugins: opts.autoprefix
          ? [ new Prefix({ browsers: opts.autoprefix }) ]
          : undefined
      }

      filed(lessFile)
        .pipe(less(lessFile, lessOpts))
        .pipe(res)
    } else {
      next()
    }
  }
}
