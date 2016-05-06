var React = require('react');
var ReactDOM = require('react-dom');
var connect = require('react-redux').connect,
    _ = require('lodash');

var mui = require('material-ui'),
    GridList = mui.GridList,
    GridTile = mui.GridTile;
    
var actions = require('../actions');

var mapStateToProps = function(state, ownProps) {
    return {
        products: state.reducers.products,
        category: _.chain(state.reducers.categories).find({id: ownProps.params.categoryId}).value()
    }; 
};

var Link = require('react-router').Link;

var mapDispatchToProps = function(dispatch) {
  return {
  };  
};

var Home = React.createClass({
    
    componentWillUpdate: function() {
        console.log(this.props.category);
    },

    render: function() {

        var productTiles = this.props.products ? _.chain(this.props.products).take(10).value().map(function(p) {
            return <GridTile
                        title={p.title[0]}
                        subtitle={p.description[0]}>
                        <img src={p.imageUrl[0]} />
            </GridTile>;           
        }) : [];
        
        return  <div>
                    <h2>{this.props.category ? this.props.category.name : '...'}</h2>
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