/** @jsx React.DOM */

var React = require('react');
var Bootstrap = require('react-bootstrap');
var Grid = Bootstrap.Grid;
var Row = Bootstrap.Row;
var Col = Bootstrap.Col;

var HomeMain = React.createClass({
	render: function() {
		return (
			<Col xs={12} md={12}>
				<p>This is a main page</p>      	
			</Col>
		);
	}
});

module.exports = HomeMain;