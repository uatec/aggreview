module.exports = function(state, action) {
    state = state || {};
    switch ( action.type ) {
        case 'RECEIVE_PRODUCTS':
            return Object.assign({}, state, {
                products: action.products
            });
        case 'RECEIVE_MENUS':
            return Object.assign({}, state, {
                themeGroups: action.themeGroups,
                categories: action.categories 
            });
        default:
            return state;
    }
};