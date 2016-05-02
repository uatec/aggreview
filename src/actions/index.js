var request = require('superagent');

var isNode = require('../utils/isNode.js');

// tests if global scope is binded to "global"
var urlPrefix = '/api/v1';
if (isNode()) {
    urlPrefix = 'http://localhost:' + (process.env.PORT || 3000) + '/api/v1';
}

var prefix = require('superagent-prefix')(urlPrefix);

module.exports = {
    
    RECEIVE_PRODUCTS: 'RECEIVE_PRODUCTS',
    receiveProducts: function(products)
    {
        return {
            type: this.RECEIVE_PRODUCTS,
            products: products
        };
    },
    
    fetchProducts: function () {
        return function (dispatch) {
            request
                .get('/products')
                .use(prefix)
                .end(function (err, res) {
                    if (err) {
                        throw new Error(err);
                    }
                    dispatch(this.receiveProducts(res.body));
                }.bind(this));
        }.bind(this);
    }
};
