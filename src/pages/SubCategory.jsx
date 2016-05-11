var React = require('react');
var ReactDOM = require('react-dom');
var connect = require('react-redux').connect,
    _ = require('lodash');

var mui = require('material-ui'),
    GridList = mui.GridList,
    GridTile = mui.GridTile;

var actions = require('../actions');

var mapStateToProps = function (state, ownProps) {
    var category = _.chain(state.reducers.categories).find({ id: ownProps.params.categoryId }).value();
    return {
        products: state.reducers.products,
        category: category,
        subCategory: category ? _.chain(category.subCategories).find({ id: ownProps.params.subCategoryId }).value() : null
    };
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
        if (this.props.params.subCategoryId != nextProps.params.subCategoryId) {
            this.props.fetchProducts(nextProps.subCategory.tags);
        }
    },

    componentDidMount: function () {
        if (this.props.subCategory)
            this.props.fetchProducts(this.props.subCategory.tags);

    },

    render: function () {

        if (!this.props.category) {
            return <div>...</div>;
        }

        var productTiles = this.props.products ? _.chain(this.props.products).take(10).value().map(function (p) {
            return <GridTile
                        title={p.title}
                        subtitle={p.description}>
                        <img src={p.image} />
            </GridTile>;
        }) : [];

        return <div>
            <h2>{this.props.category.name}</h2>
            <h3>{this.props.subCategory.name}</h3>
            <span>{this.props.subCategory ? JSON.stringify(this.props.subCategory.tags) : null}</span>

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