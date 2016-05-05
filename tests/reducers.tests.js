var reducer = require('../src/reducers');
var c = require('../src/actions');
var should = require('should');

module.exports = {
    "When products are received, they are included on state": function() {
        var oldState = {
            products: 'old products'
        };
        
        var newProductsValue = 'new products';
        
        var newState = reducer(oldState, {
            type: c.RECEIVE_PRODUCTS,
            products: newProductsValue
        });
        
        newState.products.should.equal(newProductsValue);
    },
      
    "When products are received, other state is still maintained": function() {
        var oldState = {
            someOtherState: 'something else',
            products: 'old products'
        };
        
        var newState = reducer(oldState, {
            type: c.RECEIVE_PRODUCTS,
            products: 'some new value'
        });
        
        newState.someOtherState.should.equal(oldState.someOtherState);
    },
    "When menus are received, they are included on state": function() {
        var oldState = {
            themeGroups: 'old theme groups',
            categories: 'old categories'
        };
        
        var newThemeGroupsValue = 'new theme groups';
        var newCategoriesValue = 'new categories';
        
        var newState = reducer(oldState, {
            type: c.RECEIVE_MENUS,
            themeGroups: newThemeGroupsValue,
            categories: newCategoriesValue
        });
        
        newState.themeGroups.should.equal(newThemeGroupsValue);
        newState.categories.should.equal(newCategoriesValue);
    },
      
    "When menus are received, other state is still maintained": function() {
        var oldState = {
            someOtherState: 'some other state',
            themeGroups: 'old theme groups',
            categories: 'old categories'
        };
        
        var newThemeGroupsValue = 'new theme groups';
        var newCategoriesValue = 'new categories';
        
        var newState = reducer(oldState, {
            type: c.RECEIVE_MENUS,
            themeGroups: newThemeGroupsValue,
            categories: newCategoriesValue
        });
        
        newState.someOtherState.should.equal(oldState.someOtherState);
    }      
};