/** @jsx React.DOM */

var React = require('react');

// Router
var ReactRouter = require('react-router');
var RouteHandler = ReactRouter.RouteHandler;

var AdminHeader = require('./AdminHeader.jsx');

var AdminApp = React.createClass({
	render: function() {
		return (
			<div>
				<AdminHeader />
				<RouteHandler />
			</div>
		);
	}
});

module.exports = AdminApp;
