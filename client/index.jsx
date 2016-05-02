var React = require('react');
var ReactDOM = require('react-dom');

var Root = require('../src/Root.jsx');

var renderTarget = document.getElementById("content");

ReactDOM.render(
		<Root />,
		renderTarget
);