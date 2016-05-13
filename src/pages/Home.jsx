var React = require('react');
var connect = require('react-redux').connect;

var Link = require('react-router').Link;

var mapStateToProps = function (state) {
    return {
        categories: state.reducers.categories,
        themeGroups: state.reducers.themeGroups
    };
};

var ListItem = require('material-ui/List').ListItem;

var Home = React.createClass({

    render: function () {

        var categories = this.props.categories ? this.props.categories.map(function (c) {
            return <ListItem key={c.id}>
                <Link to={'/category/' + c.id}>
                    {c.name}
                </Link>
            </ListItem>;
        }) : [];

        var themeGroups = this.props.themeGroups ? this.props.themeGroups.map(function (tg) {
            return <ListItem key={tg.id}>
                <Link to={'/theme/' + tg.id}>
                    {tg.name}
                </Link>
            </ListItem>;
        }) : [];


        return <div>
            <div style={{width: '100%'}}>
                <div style={{ width: '33%', display: 'inline-block', verticalAlign: 'top' }}>
                    <ListItem>
                    Shop by Category
                    </ListItem>
                    {categories}
                </div>
                <div style={{ width: '66%', display: 'inline-block', verticalAlign: 'top'  }}>
                    <ListItem>
                    Shop by Room
                    </ListItem>
                    {themeGroups}
                </div>
            </div>
            <div style={{width: '100%'}}>
                <h2>Welcome</h2>
                <h3>Try using the menus</h3>
            </div>
        </div>;
    }
});

module.exports = connect(
    mapStateToProps
)(Home);