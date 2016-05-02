var express = require('express');
var app = express();

var React = require('react');
var ReactDOMServer = require('react-dom/server');
var App = require('./generated/app');
var path = require('path');
var _ = require('lodash');

var envVars = '<script>GLOBAL = {}; GLOBAL.env=' + JSON.stringify(_.pick(process.env, [
  ])) + '</script>';
  
GLOBAL.env = process.env;

app.use(function(req, res, next) {
    GLOBAL.navigator = {
        userAgent: req.headers['user-agent']
    };
    next();
});

app.get('/', function(request, response) {
  var body = '';
  if ( GLOBAL.env.enable_isomorphic_rendering ) {
    body = ReactDOMServer.renderToString(<App />);
  }
  response.send('<html><head>' + envVars + '<meta name="viewport" content="width=device-width, initial-scale=1.0"></head><body><div id="content">' + body + '</div><script src="/bundle.js"></script></body></html>');
});

// Static assets
app.use(express.static(path.resolve(__dirname, '../dist')));

var port = process.env.PORT || 3000;
app.listen(port, function() { console.log('Server running on port ' + port);});
