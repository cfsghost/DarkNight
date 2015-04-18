/** @jsx React.DOM */

var React = require('react');
var Bootstrap = require('react-bootstrap');
var Navbar = Bootstrap.Navbar;
var Nav = Bootstrap.Nav;
var NavItem = Bootstrap.NavItem;
var DropdownButton = Bootstrap.DropdownButton;
var MenuItem = Bootstrap.MenuItem;

var EndpointActions = require('../actions/Endpoint');
var MemberActions = require('../actions/Member');

var AdminHeader = React.createClass({
	getInitialState: function() {
		return {
			endpoint: false,
			member: false
		};
	},
	manageEndpoint: function() {
		this.setState({
			endpoint: true,
			member: false
		});

		MemberActions.Blur();
		EndpointActions.Manage();
	},
	manageMember: function() {
		this.setState({
			endpoint: false,
			member: true
		});

		EndpointActions.Blur();
		MemberActions.Manage();
	},
	render: function() {
		return (
			<Navbar brand='DarkNight' inverse staticTop>
				<Nav>
					<NavItem eventKey={1} onClick={this.manageEndpoint} active={this.state.endpoint}>Endpoint</NavItem>
					<NavItem eventKey={2} onClick={this.manageMember} active={this.state.member}>Member</NavItem>
				</Nav>
			</Navbar>
		);
	}
});

module.exports = AdminHeader;