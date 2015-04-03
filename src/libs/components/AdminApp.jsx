/** @jsx React.DOM */

var React = require('react');
var Header = require('./Header.jsx');

var AdminApp = React.createClass({
	render: function() {
		return (
			<div>
				<Header />
			</div>
		);
	}
});

module.exports = AdminApp;
