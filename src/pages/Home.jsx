var React = require('react');
var ReactDOM = require('react-dom');
var connect = require('react-redux').connect,
    _ = require('lodash');

var mui = require('material-ui'),
    GridList = mui.GridList,
    GridTile = mui.GridTile;
    
var actions = require('../actions');

var mapStateToProps = function(state) {
    return {
        products: state.products,
        categories: state.categories,
        themeGroups: state.themeGroups
    }; 
};

var mapDispatchToProps = function(dispatch) {
  return {
  };  
};

var Home = React.createClass({

    render: function() {

        var productTiles = this.props.products ? this.props.products.map(function(p) {
            return <GridTile
                        title={p.title[0]}
                        subtitle={p.description[0]}>
                        <img src={p.imageUrl[0]} />
            </GridTile>;           
        }) : [];
        
        var categories = this.props.categories ? this.props.categories.map(function(c) {
             return <li>
                {c.name}
             </li>;
        }) : [];
        
        var themeGroups = this.props.themeGroups ? this.props.themeGroups.map(function(tg) {
             return <li>
                {tg.name}
                <ul>
                    {tg.themes.map(function(t) {
                      return <li>{t.name}</li>  
                    })}
                </ul>
             </li>;
        }) : [];
        
        var menus = GLOBAL.env.enable_menus ? 
            <div>
                <ul>
                    {categories}
                </ul>
                <ul>
                    {themeGroups}
                </ul>
            </div> : null;

        return  <div>
                    <center style={{backgroundColor:'#3F51B5', color: 'white'}}>
                        <h1>Aggreview</h1>
                        <h3>View aggregated data in one place.</h3>
                    </center>
                    {menus}
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