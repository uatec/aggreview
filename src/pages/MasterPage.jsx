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

var IconButton = require('material-ui/IconButton').default;
var MenuIcon = require('material-ui/svg-icons/navigation/menu').default;

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

class MasterPage extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {};    
    }
    
    toggleDrawer() {
        this.setState({
            drawerOpen: !this.state.drawerOpen
        });
    }

    render () {

        var categories = this.props.categories ? this.props.categories.map(function (c) {
            return <ListItem key={c.id} nestedItems=
                    {c.subCategories.map(function (sc) {
                        return <ListItem key={sc.id} onClick={this.toggleDrawer.bind(this)}>
                            <Link to={'/category/' + c.id + '/' + sc.id}>
                                {sc.name}
                            </Link>
                        </ListItem>
                    }.bind(this))}>
                <Link to={'/category/' + c.id} 
                onClick={this.toggleDrawer.bind(this)}>
                    {c.name}
                </Link>
            </ListItem>;
        }.bind(this)) : [];

        var themeGroups = this.props.themeGroups ? this.props.themeGroups.map(function (tg) {
            return <ListItem key={tg.id} nestedItems=
                    {tg.themes.map(function (t) {
                        return <ListItem key={t.id} onClick={this.toggleDrawer.bind(this)}>
                            <Link to={'/theme/' + tg.id + '/' + t.id}>
                                {t.name}
                            </Link>
                        </ListItem>
                    }.bind(this))}>
                <Link to={'/theme/' + tg.id} onClick={this.toggleDrawer.bind(this)}>
                    {tg.name}
                </Link>
            </ListItem>;
        }.bind(this)) : [];

        var menus = <div>
                {categories}
                <Divider />
                {themeGroups}
        </div>;

        return <div>
            <AppBar
                title={<Link to='/'>Aggreview</Link>}
                iconElementLeft={<IconButton onClick={this.toggleDrawer.bind(this)}><MenuIcon /></IconButton>}
                />
            <Drawer 
                docked={false}
                onRequestChange={function(open) {this.setState({drawerOpen: open});}.bind(this)}
                open={!!this.state.drawerOpen}>
                {menus}
            </Drawer>
            {this.props.children}
        </div>;
    }
};

module.exports = connect(
    mapStateToProps,
    mapDispatchToProps
)(MasterPage);