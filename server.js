'use strict';

var http = require('http'),
    browserify = require('browserify'),
    literalify = require('literalify'),
    fs = require('fs'),
    jsx = require('node-jsx').install({harmony: true}),
    React = require('react'),
    Router = require('react-router'),
    mui = require('material-ui'),
    // This is our React component, shared by server and browser thanks to browserify
    Routes = require('./src/app/config/Routes');

var PLACEHOLDER = '&nbsp;&nbsp;&nbsp;';
var JS = fs.readFileSync('./hasgluten.github.io/main.js', {encoding: 'utf8'});
var CSS = fs.readFileSync('./hasgluten.github.io/main.css', {encoding: 'utf8'});
var LOGO = fs.readFileSync('./hasgluten.github.io/img/logo.png');
var TEMPLATE = fs.readFileSync('./src/www/index.html', {encoding: 'utf8'});

http.createServer(function(req, res) {

  if (req.url == '/main.js') {

    res.setHeader('Content-Type', 'text/javascript');
    res.end(JS);

  } else if (req.url == '/main.css') {

    res.setHeader('Content-Type', 'text/css');
    res.end(CSS);

  } else if (req.url == '/img/logo.png') {

    res.setHeader('Content-Type', 'image/png');
    res.end(LOGO);

  } else {
    Router.run(Routes, req.url, function (Handler, state) {
        var lang = typeof state.params.lang !== 'undefined' ? state.params.lang : 'en';
        var html = React.renderToString(React.createElement(Handler, {lang: lang}));
        res.end(TEMPLATE.replace(PLACEHOLDER, html));
    });
  }

// The http server listens on port 3000
}).listen(3000, function(err) {
  if (err) throw err
  console.log('Listening on 3000...')
})

// A utility function to safely escape JSON for embedding in a <script> tag
function safeStringify(obj) {
  return JSON.stringify(obj).replace(/<\/script/g, '<\\/script').replace(/<!--/g, '<\\!--')
}
