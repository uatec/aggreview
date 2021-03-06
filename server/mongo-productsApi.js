var express = require('express');
var router = new express.Router();

var MongoClient = require('mongodb').MongoClient;
var url = GLOBAL.env.productsMongoUrl;
var collectionName = GLOBAL.env.products_mongo_collection;

router
    .get('/', function (req, res, next) {
        MongoClient.connect(url, function(err, db) {
            
            var query = {};
            
            var tags = JSON.parse(req.query.q) || [];
            for ( var i in tags ) {
                var tag = tags[i];
                query['tags.' + tag] = true;
            }
            
            console.log('QUERY - ' + JSON.stringify(req.params.tags) + ' -> ' + JSON.stringify(query));
            var products = db.collection(collectionName);
            products.find(query).toArray(function(err, docs) {
                if ( err ) {
                    throw new Error(err);
                }
                
                res.json(docs);
                
                db.close();
            });
        });
    });

module.exports = router;