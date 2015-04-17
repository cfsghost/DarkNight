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
	manageEndpoint: function() {
		MemberActions.Blur();
		EndpointActions.Manage();
	},
	manageMember: function() {
		EndpointActions.Blur();
		MemberActions.Manage();
	},
	render: function() {
		return (
			<Navbar brand='DarkNight' inverse staticTop>
				<Nav>
					<NavItem eventKey={1} onClick={this.manageEndpoint}>Endpoint</NavItem>
					<NavItem eventKey={2} onClick={this.manageMember}>Member</NavItem>
				</Nav>
			</Navbar>
		);
	}
});

module.exports = AdminHeader;
