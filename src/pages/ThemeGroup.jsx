var React = require('react');
var ReactDOM = require('react-dom');
var connect = require('react-redux').connect,
    _ = require('lodash');

var mui = require('material-ui'),
    GridList = mui.GridList,
    GridTile = mui.GridTile;

var actions = require('../actions');

var mapStateToProps = function (state, ownProps) {
    return {
        products: state.reducers.products,
        themeGroup: _.chain(state.reducers.themeGroups).find({ id: ownProps.params.themeGroupId }).value()
    };
};

var Link = require('react-router').Link;

var actions = require('../actions');

var mapDispatchToProps = function (dispatch) {
    return {
        fetchProducts: function (tags) {
            dispatch(actions.fetchProducts(tags));
        }
    };
};

var Home = React.createClass({

    componentWillMount: function () {
        if (this.props.themeGroup) {
            this.props.fetchProducts(this.props.themeGroup.tags);
        }
    },

    render: function () {

        var productTiles = this.props.products ? _.chain(this.props.products).take(10).value().map(function (p) {
            return <GridTile
                title={p.title[0]}
                subtitle={p.description[0]}>
                <img src={p.imageUrl[0]} />
            </GridTile>;
        }) : [];

        return <div>
            <h2>{this.props.themeGroup ? this.props.themeGroup.name : '...'}</h2>
            <span>{this.props.themeGroup ? JSON.stringify(this.props.themeGroup.tags) : null}</span>
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