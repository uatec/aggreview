var React = require('react');
var ReactDOM = require('react-dom');
var connect = require('react-redux').connect,
    _ = require('lodash');

var mui = require('material-ui'),
    GridList = mui.GridList,
    GridTile = mui.GridTile,
    AppBar = mui.AppBar,
    Drawer = mui.Drawer,
    List = mui.List,
    ListItem = mui.ListItem,
    Divider = mui.Divider;

var actions = require('../actions');

var mapStateToProps = function (state) {
    return {
        categories: state.reducers.categories,
        themeGroups: state.reducers.themeGroups
    };
};

var Link = require('react-router').Link;

var mapDispatchToProps = function (dispatch) {
    return {
    };
};

var MasterPage = React.createClass({

    toggleDrawer: function() {
        this.setState({
            drawerOpen: !this.state.drawerOpen
        });
    },
    
    getInitialState: function() {
        return {};
    },

    render: function () {

        var categories = this.props.categories ? this.props.categories.map(function (c) {
            return <ListItem key={c.id} nestedItems=
                    {c.subCategories.map(function (sc) {
                        return <ListItem key={sc.id} onClick={this.toggleDrawer}>
                            <Link to={'/category/' + c.id + '/' + sc.id}>
                                {sc.name}
                            </Link>
                        </ListItem>
                    })}>
                <Link to={'/category/' + c.id} 
                onClick={this.toggleDrawer}>
                    {c.name}
                </Link>
            </ListItem>;
        }) : [];

        var themeGroups = this.props.themeGroups ? this.props.themeGroups.map(function (tg) {
            return <ListItem key={tg.id} nestedItems=
                    {tg.themes.map(function (t) {
                        return <ListItem key={t.id} onClick={this.toggleDrawer}>
                            <Link to={'/theme/' + tg.id + '/' + t.id}>
                                {t.name}
                            </Link>
                        </ListItem>
                    })}>
                <Link to={'/theme/' + tg.id} onClick={this.toggleDrawer}>
                    {tg.name}
                </Link>
            </ListItem>;
        }) : [];

        var menus = <div>
                {categories}
                <Divider />
                {themeGroups}
        </div>;

        return <div>
            <AppBar
                title="Aggreview"
                iconClassNameRight="muidocs-icon-navigation-expand-more"
                onClick={this.toggleDrawer}
                />
            <Drawer 
                docked={false}
                onRequestChange={function(open) {this.setState({drawerOpen: open});}.bind(this)}
                open={!!this.state.drawerOpen}>
                {menus}
            </Drawer>
            <hr />
            {this.props.children}
        </div>;
    }
});

module.exports = connect(
    mapStateToProps,
    mapDispatchToProps
)(MasterPage);