var request = require('superagent');

var isNode = require('../utils/isNode.js');

// tests if global scope is binded to "global"
var urlPrefix = '/api/v1';
if(isNode())  { 
    urlPrefix = 'http://localhost:' + (process.env.PORT || 3000) + '/api/v1';
}

var prefix = require('superagent-prefix')(urlPrefix);

module.exports = {
    
};
