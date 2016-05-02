var express = require('express');
var router = new express.Router();
var FireBase = require('firebase');
var request = require('superagent');
var bodyParser = require('body-parser');

var firebaseUrl = process.env.firebaseUrl;

router.use(bodyParser.json()); // for parsing application/json

router
    .get('/', function (req, res, next) {
        request
            .get('https://' + firebaseUrl + '/.json\?limitToFirst\=10\&orderBy\=\"dateCreated\"')
            .end(function(err, data) {
                if (err) {
                    console.error('error loading api', err);
                    throw err;
                }
                var dataArray = Object.keys(data.body).map(function(key) {
                    return data.body[key];
                });
                res.json(dataArray);
                next();
            });
    });

module.exports = router;