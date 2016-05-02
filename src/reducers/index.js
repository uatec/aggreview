module.exports = function(state, action) {
    state = state || {};
    switch ( action.type ) {
        case 'RECEIVE_PRODUCTS':
            return Object.assign({}, state, {
                products: action.products
            });
        default:
            return state;
    }
};