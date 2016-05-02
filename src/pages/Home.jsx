var React = require('react');
var ReactDOM = require('react-dom');
var connect = require('react-redux').connect,
    _ = require('lodash');

var mui = require('material-ui'),
    Card = mui.Card,
    CardMedia = mui.CardMedia,
    CardTitle = mui.CardTitle;
    
var actions = require('../actions');

var mapStateToProps = function(state) {
    return {
        products: state.products
    }; 
};

var mapDispatchToProps = function(dispatch) {
  return {
  };  
};

var Home = React.createClass({

    render: function() {

        var productCards = this.props.products ? this.props.products.map(function(p) {
            return <div>
                <Card>
                    <CardMedia
                        overlay={<CardTitle title={p.title[0]} subtitle={p.description[0]} />}
                        >
                        <img src={p.imageUrl[0]} />
                        </CardMedia>
                </Card>
                <br />
            </div>;           
        }) : [];
        
        return  <div>
                    <center style={{backgroundColor:'#3F51B5', color: 'white'}}>
                        <h1>Aggreview</h1>
                        <h3>View aggregated data in one place.</h3>
                    </center>
                    <div>
                        {productCards}
                    </div>
                </div>;
    }
});

module.exports = connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);