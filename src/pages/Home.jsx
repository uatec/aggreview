var React = require('react');
var ReactDOM = require('react-dom');
var connect = require('react-redux').connect,
    _ = require('lodash');

var mui = require('material-ui'),
    Card = mui.Card,
    CardTitle = mui.CardTitle;
    
var actions = require('../actions');

var mapStateToProps = function(state) {
    return {
    }; 
};

var mapDispatchToProps = function(dispatch) {
  return {
  };  
};

var Home = React.createClass({

    render: function() {

        return  <div>
                    <center style={{backgroundColor:'#3F51B5', color: 'white'}}>
                        <h1>Aggreview</h1>
                        <h3>View aggregated data in one place.</h3>
                    </center>
                    <div>
                        <Card>
                            <CardTitle>
                                Some Title
                            </CardTitle>
                            Some content here
                        </Card>
                    </div>
                </div>;
    }
});

module.exports = connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);