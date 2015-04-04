/** @jsx React.DOM */

var React = require('react');
var AdminHeader = require('./AdminHeader.jsx');
var Endpoint = require('./admin/Endpoint.jsx');
var EndpointComponent = Endpoint.Component;

var AdminApp = React.createClass({
	render: function() {
		return (
			<div>
				<AdminHeader />
				<EndpointComponent />
			</div>
		);
	}
});

module.exports = AdminApp;
