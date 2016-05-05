var request = require('superagent');
var jsonPath = require('jsonpath-plus');
var _ = require('lodash');
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
    },
    
    RECEIVE_MENUS: 'RECEIVE_MENUS',
    receiveMenus: function(themeGroups, categories) {
        return {
            type: this.RECEIVE_MENUS,
            themeGroups: themeGroups,
            categories: categories
        };
    },
    
    fetchMenus: function() {
        return function(dispatch) {

            if ( GLOBAL.env.stub_menus ) {
                dispatch(this.receiveMenus([{
                    id: 'themegroup_1',
                    name: 'Theme Group 1',
                    themes: [{
                        id: 'theme_1',
                        name: 'Theme 1'
                    }]
                }], [{
                    id: 'category_1',
                    name: 'Category 1',
                    subCategories: [{
                        id: 'subCategory_1',
                        name: 'Subcategory 1'
                    }]
                }]));
                return;  
            }

            request
                .get('https://cdn.contentful.com/spaces/l4qttwbwoj09/entries?access_token=4f16ed3bfca848053391d2040a9f78d721ca76806a54d3d17bf34f1b572de945')
                .end(function(err, res) {
                    if (err) {
                        throw new Error(err);
                    }

                    var input = res.body;                    
                    
                                        
                    var themes = _.chain(input.items)
                        .filter(function(i) {
                            return i.sys.contentType.sys.id == 'theme';
                        })
                        .map(function(i) {
                            return Object.assign({}, i.fields, {
                                id: i.sys.id
                            });    
                        })
                        .value();
                    var themeGroups = _.chain(input.items)
                        .filter(function(i) {
                            return i.sys.contentType.sys.id == 'themeGroup';
                        })
                        .map(function(i) {
                            return Object.assign({}, i.fields, {
                                id: i.sys.id,
                                themes: _.chain(i.fields.themes)
                                    .map(function(t) {
                                        return _.find(themes, {
                                            id: t.sys.id
                                        });
                                    })
                                    .value()
                            });    
                        })
                        .value();
                        
                    var subcategories = _.chain(input.items)
                        .filter(function(i) {
                            return i.sys.contentType.sys.id == 'subCategory';
                        })
                        .map(function(i) {
                            return Object.assign({}, i.fields, {
                                id: i.sys.id
                            })    
                        })
                        .value();
                    var categories = _.chain(input.items)
                        .filter(function(i) {
                            return i.sys.contentType.sys.id == 'category';
                        })
                        .map(function(i) {
                            return Object.assign({}, i.fields, {
                                id: i.sys.id,
                                subCategories: _.chain(i.fields.subCategories2)
                                    .map(function(t) {
                                        return _.find(subcategories, {
                                            id: t.sys.id
                                        });
                                    })
                                    .value()
                            });   
                        })
                        .value();
                        
                    dispatch(this.receiveMenus(themeGroups, categories));
                    
                }.bind(this));
        }.bind(this);     
    }
};
