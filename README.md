# simple-less-middleware

[![unstable](http://badges.github.io/stability-badges/dist/unstable.svg)](http://github.com/badges/stability-badges)

A minimal LESS middleware for server requests.

When the given CSS URL is requested, the server responds with the result of LESS transpilation.

## Install

```sh
npm install simple-less-middleware --save
```

## Example

```js
var lessMiddleware = require('simple-less-middleware')

// path to the LESS entry point
var file = '/path/to/style.less'

// what the <link href> will request
var url = 'style.css'

var less = lessMiddleware(file, url, {
  compress: true,
  autoprefix: 'last 2 browsers'
})

var server = http.createServer(function (req, res) {
  less(file, cssUrl, function () {
    // handle non-less requests...
  })
})

server.listen(8000)
```

## Usage

[![NPM](https://nodei.co/npm/simple-less-middleware.png)](https://www.npmjs.com/package/simple-less-middleware)

#### `fn = middleware (lessFile, cssUrl, [opts])`

Creates a new `fn(req, res, next)` function with `lessFile` (path to LESS entry point) and `cssUrl` (the URL pathname to respond to the request on).

Options:

- `compress` Boolean, default false
- `autoprefix` Array or comma-separated String list of browsers, default no autoprefixing
- `paths` Array of paths to provide to LESS `render()`

## License

MIT, see [LICENSE.md](http://github.com/mattdesl/simple-less-middleware/blob/master/LICENSE.md) for details.
