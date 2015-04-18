/** @jsx React.DOM */

var React = require('react');
var AdminHeader = require('./AdminHeader.jsx');
var Endpoint = require('./admin/Endpoint.jsx');
var EndpointComponent = Endpoint.Component;
var Member = require('./admin/Member.jsx');
var MemberComponent = Member.Component;

var AdminApp = React.createClass({
	render: function() {
		return (
			<div>
				<AdminHeader />
				<EndpointComponent />
				<MemberComponent />
			</div>
		);
	}
});

module.exports = React.createFactory(AdminApp);
