var React = require('react');
var ReactDOM = require('react-dom');
require('react-tap-event-plugin')();

var Provider = require('react-redux').Provider;

var Redux = require('redux'),
    createStore = Redux.createStore,
	applyMiddleware = Redux.applyMiddleware;

var thunkMiddleware = require('redux-thunk').default;

var Home = require('./pages/Home.jsx');

var reducers = require('./reducers');
var actions = require('./actions');

var isNode = require('./utils/isNode.js');

module.exports = React.createClass({
	componentWillMount: function() {
		this.store = createStore(reducers,
			applyMiddleware(
				thunkMiddleware
			));
			
		if ( GLOBAL.env.enable_menus ) {
			this.store.dispatch(actions.fetchMenus());
		} else {
			this.store.dispatch(actions.fetchProducts());
		}
		
		if ( !isNode() ) {
			// TODO: any client side only boot strapping
		}
	},
	
	render: function() {
		return <Provider store={this.store}>
				<Home />
			</Provider>;
	}
});