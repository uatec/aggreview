var React = require('react');
var connect = require('react-redux').connect;

var Link = require('react-router').Link;

var NoMatch = React.createClass({

    render: function () {

        return <div>
            <h2>Oops, there's nothing here</h2>
            <h3><Link to='/'>How about going to the home page?</Link></h3>
        </div>;
    }
});

module.exports = NoMatch;