var React = require('react');
var ReactDOM = require('react-dom');
require('react-tap-event-plugin')();

var Provider = require('react-redux').Provider;

var Redux = require('redux'),
    createStore = Redux.createStore,
	applyMiddleware = Redux.applyMiddleware,
	combineReducers = Redux.combineReducers,
	compose = Redux.compose;

var thunkMiddleware = require('redux-thunk').default;

var Home = require('./pages/Home.jsx');

var reducers = require('./reducers');
var actions = require('./actions');

var isNode = require('./utils/isNode.js');

var ReactRouter = require('react-router'),
	Router = ReactRouter.Router,
	Route = ReactRouter.Route,
	browserHistory = ReactRouter.browserHistory,
	createMemoryHistory = ReactRouter.createMemoryHistory;

var ReactRouterRedux = require('react-router-redux'),
	syncHistoryWithStore = ReactRouterRedux.syncHistoryWithStore,
	routerReducer = ReactRouterRedux.routerReducer;

var Root = React.createClass({
	componentWillMount: function() {
		this.store = createStore(
			combineReducers({
				reducers: reducers,
				routing: routerReducer
			}),
			compose(
				applyMiddleware(
					thunkMiddleware
				),
				(typeof window !== 'undefined') && window.devToolsExtension ? window.devToolsExtension() : function(f) { return f; }
			)
			);
			
		var history = isNode() ?
			createMemoryHistory(this.props.pathName) :
			browserHistory;
			
		// Create an enhanced history that syncs navigation events with the store
		this.history = syncHistoryWithStore(history, this.store)

		this.history.listen(function(location) { console.log('location: ', location.pathname); });
		
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
				<Router history={this.history}>
					<Route path="/" component={Home}>
						<Route path="category/:categoryId" component={Home}/>
						<Route path="category/:categoryId/:subCategoryId" component={Home}/>
						<Route path="theme/:themeId" component={Home}/>
						<Route path="theme/:themeGroupId/:themeId" component={Home}/>
					</Route>
				</Router>
			</Provider>;
	}
});

module.exports = Root;