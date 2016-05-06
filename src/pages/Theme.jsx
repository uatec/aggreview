var React = require('react');
var ReactDOM = require('react-dom');
var connect = require('react-redux').connect,
    _ = require('lodash');

var mui = require('material-ui'),
    GridList = mui.GridList,
    GridTile = mui.GridTile;

var actions = require('../actions');

var mapStateToProps = function (state, ownProps) {
    var themeGroup = _.chain(state.reducers.themeGroups).find({ id: ownProps.params.themeGroupId }).value();
    return {
        products: state.reducers.products,
        themeGroup: themeGroup,
        theme: themeGroup ? _.chain(themeGroup.themes).find({ id: ownProps.params.themeId }).value() : null
    };
};

var Link = require('react-router').Link;

var mapDispatchToProps = function (dispatch) {
    return {
    };
};

var Home = React.createClass({

    componentWillUpdate: function () {
        //console.log(this.props.themeGroup);
    },

    render: function () {
        
        if ( !this.props.themeGroup ) {
            return <div>...</div>;
        }

        var productTiles = this.props.products ? _.chain(this.props.products).take(10).value().map(function (p) {
            return <GridTile
                title={p.title[0]}
                subtitle={p.description[0]}>
                <img src={p.imageUrl[0]} />
            </GridTile>;
        }) : [];
        
        return <div>
            <h2>{this.props.themeGroup.name}</h2>
            <h3>{this.props.theme.name}</h3>
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
