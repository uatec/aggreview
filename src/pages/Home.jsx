var React = require('react');
var connect = require('react-redux').connect;

var Link = require('react-router').Link;

var NoMatch = React.createClass({

    render: function () {

        return <div>
            <h2>Welcome</h2>
            <h3>Try using the menus</h3>
        </div>;
    }
});

module.exports = NoMatch;