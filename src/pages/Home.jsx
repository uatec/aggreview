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
        categories: state.reducers.categories,
        themeGroups: state.reducers.themeGroups
    }; 
};

var Link = require('react-router').Link;

var mapDispatchToProps = function(dispatch) {
  return {
  };  
};

var Home = React.createClass({
    
    render: function() {

        var categories = this.props.categories ? this.props.categories.map(function(c) {
             return <li>
                <Link to={'/category/' + c.id}>
                    {c.name}
                </Link>
                <ul>
                    {c.subCategories.map(function(sc) {
                      return <li>
                            <Link to={'/category/' + c.id + '/' + sc.id}>
                            {sc.name}
                            </Link>
                        </li>  
                    })}
                </ul>
             </li>;
        }) : [];
        
        var themeGroups = this.props.themeGroups ? this.props.themeGroups.map(function(tg) {
             return <li>
                <Link to={'/theme/' + tg.id}>         
                    {tg.name}
                </Link>
                <ul>
                    {tg.themes.map(function(t) {
                      return <li>
                            <Link to={'/theme/' + tg.id + '/' + t.id}>
                                {t.name}
                            </Link>
                        </li>  
                    })}
                </ul>
             </li>;
        }) : [];
        
        var menus = GLOBAL.env.enable_menus ? 
            <div>
                <ul>
                    {categories}
                </ul>
                {GLOBAL.env.enable_themes ? 
                <ul>
                    {themeGroups}
                </ul> : null}
            </div> : null;

        return  <div>
                    <center style={{backgroundColor:'#3F51B5', color: 'white'}}>
                        <h1>Aggreview</h1>
                        <span>View aggregated data in one place.</span>
                    </center>
                    {menus}
                    <hr />
                    {this.props.children}
                </div>;
    }
});

module.exports = connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);