/** @jsx React.DOM */

var React = require('react');
var Header = require('./Header.jsx');
var LoginMain = require('./LoginMain.jsx');

var LoginPage = React.createClass({
	render: function() {
		return (
			<div>
				<Header />
				<LoginMain />
			</div>
		);
	}
});

module.exports = LoginPage;