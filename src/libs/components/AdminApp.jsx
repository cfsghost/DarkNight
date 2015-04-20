/** @jsx React.DOM */

var React = require('react');

// Router
var ReactRouter = require('react-router');
var RouteHandler = ReactRouter.RouteHandler;

var AdminHeader = require('./AdminHeader.jsx');

var AdminApp = React.createClass({
	render: function() {
		var contentStyle = {
			'padding-top': '50px'
		};

		return (
			<div>
				<AdminHeader />
				<div style={contentStyle}>
					<RouteHandler />
				</div>
			</div>
		);
	}
});

module.exports = AdminApp;
