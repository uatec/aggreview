var React = require('react');
var ReactDOM = require('react-dom');
var connect = require('react-redux').connect,
    _ = require('lodash');

var mui = require('material-ui'),
    GridList = mui.GridList,
    GridTile = mui.GridTile;

var actions = require('../actions');

var mapStateToProps = function (state, ownProps) {
    var props = {
        products: state.reducers.products,
        category: _.chain(state.reducers.categories).find({ id: ownProps.params.categoryId }).value()
    };
    console.log('setting category props:', props);
    return props;
};

var Link = require('react-router').Link;

var mapDispatchToProps = function (dispatch) {
    return {
        fetchProducts: function (tags) {
            dispatch(actions.fetchProducts(tags));
        }
    };
};

var Home = React.createClass({
    componentWillReceiveProps: function (nextProps) {
        console.log('receiving new props:', this.props, '->', nextProps);
        if (this.props.params.categoryId != nextProps.params.categoryId) {
            this.props.fetchProducts(nextProps.category.tags);
        }
    },

    componentDidMount: function () {
        console.log('component did mount with props:', this.props);
        if (this.props.category)
            this.props.fetchProducts(this.props.category.tags);

    },

    render: function () {

        var productTiles = this.props.products ? _.chain(this.props.products).take(10).value().map(function (p) {
            return <GridTile
                title={p.title}
                subtitle={p.description}>
                    <img src={p.image} />
            </GridTile>;
        }) : [];

        return <div>
            <h2>{this.props.category ? this.props.category.name : '...'}</h2>
            <span>{this.props.category ? JSON.stringify(this.props.category.tags) : null}</span>
            <GridList>
                {productTiles}
            </GridList>
        </div>;
    }
});

module.exports = connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);