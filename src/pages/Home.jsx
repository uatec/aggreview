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
import {Tabs, Tab} from 'material-ui/Tabs';

class Home extends React.Component {

    render() {

        var categories = this.props.categories ? this.props.categories.map(function (c) {
            return <ListItem style={{ background: '#E57373' }} key={c.id}>
                <Link to={'/category/' + c.id}>
                    {c.name}
                </Link>
            </ListItem>;
        }) : [];

        var themeGroups = this.props.themeGroups ? this.props.themeGroups.map(function (tg) {
            return <ListItem style={{ background: '#FFCB28' }}key={tg.id}>
                <Link to={'/theme/' + tg.id}>
                    {tg.name}
                </Link>
            </ListItem>;
        }) : [];


        return <div>
            <Tabs>
                <Tab
                    value='category'
                    label="Shop by Category"
                    route="/category"
                    >
                    {categories}
                </Tab>
                
                <Tab
                    value='theme'
                    label="Shop by Room"
                    route="/theme"
                    >
                    {themeGroups}
                </Tab>
                
                <Tab
                    value='newlyfeatured'
                    label="Newly featured"
                    route="/newlyfeatured"
                    >
                </Tab>


            </Tabs>

            <div style={{ width: '100%' }}>
                <h2>Welcome</h2>
                <h3>Try using the menus</h3>
            </div>
        </div>;
    }
};

module.exports = connect(
    mapStateToProps
)(Home);