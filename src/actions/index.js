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

var extractThemes = function(input) {
    return _.chain(input.items)
            .filter(function(i) {
                return i.sys.contentType.sys.id == 'theme';
            })
            .map(function(i) {
                return Object.assign({}, i.fields, {
                    id: i.sys.id
                });    
            })
            .value();
};

var extractThemeGroups = function(input, themes) {
    return _.chain(input.items)
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
};

var extractSubCategories = function(input) {
    _.chain(input.items)
            .filter(function(i) {
                return i.sys.contentType.sys.id == 'subCategory';
            })
            .map(function(i) {
                return Object.assign({}, i.fields, {
                    id: i.sys.id
                }); 
            })
            .value();
};

var extractSubCategories = function(input, subcategories) {
    return _.chain(input.items)
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
};

var actions = {
    
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
    receiveMenus: function(err, res) {
        if (err) {
            throw new Error(err);
        }

        var input = res.body;                    
                            
        var themes = extractThemes(input);
        var themeGroups = extractThemeGroups(input, themes);
            
        var subcategories = extractSubCategories(input);
        var categories = extractCategories(input, subcategories);
            
        return {
            type: this.RECEIVE_MENUS,
            themeGroups: themeGroups,
            categories: categories
        };
    },
    
    fetchMenus: function() {
        return function(dispatch) {
            
            var spaceID = GLOBAL.env.contentfulSpaceId;
            var access_token = GLOBAL.env.contentfulAccessToken;

            var url = 'https://cdn.contentful.com/spaces/' + spaceId + '/entries?access_token=' + access_token;

            request
                .get(url)
                .end(this.receiveMenus.bind(this));
                
        }.bind(this);     
    }
};

if ( GLOBAL.env.stub_menus ) {
    actions.fetchMenus = function() {
        return {
            type: this.RECEIVE_MENUS,
            themeGroups: [{
                    id: 'themegroup_1',
                    name: 'Theme Group 1',
                    themes: [{
                        id: 'theme_1',
                        name: 'Theme 1'
                    }]
                }],
            categories: [{
                    id: 'category_1',
                    name: 'Category 1',
                    subCategories: [{
                        id: 'subCategory_1',
                        name: 'Subcategory 1'
                    }]
                }]
        };
    };
}
                       
module.exports = actions;