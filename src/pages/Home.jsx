var React = require('react');
var connect = require('react-redux').connect;

var Link = require('react-router').Link;

var mapStateToProps = function (state) {
    return {
        categories: state.reducers.categories,
        themeGroups: state.reducers.themeGroups
    };
};

var Home = React.createClass({

    render: function () {

        var categories = this.props.categories ? this.props.categories.map(function (c) {
            return <div key={c.id}>
                <Link to={'/category/' + c.id}>
                    {c.name}
                </Link>
            </div>;
        }) : [];

        var themeGroups = this.props.themeGroups ? this.props.themeGroups.map(function (tg) {
            return <div key={tg.id}>
                <Link to={'/theme/' + tg.id}>
                    {tg.name}
                </Link>
            </div>;
        }) : [];


        return <div>
            <div>
                Shop by Category
                {categories}
            </div>
            <div>
                Shop by Room
                {themeGroups}
            </div>

            <h2>Welcome</h2>
            <h3>Try using the menus</h3>
        </div>;
    }
});

module.exports = connect(
    mapStateToProps
)(Home);