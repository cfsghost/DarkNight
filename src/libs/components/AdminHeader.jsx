/** @jsx React.DOM */

var React = require('react');
var Bootstrap = require('react-bootstrap');
var Navbar = Bootstrap.Navbar;
var Nav = Bootstrap.Nav;
var NavItem = Bootstrap.NavItem;
var DropdownButton = Bootstrap.DropdownButton;
var MenuItem = Bootstrap.MenuItem;

var EndpointActions = require('../actions/Endpoint');

var AdminHeader = React.createClass({
	newModal: function() {
		EndpointActions.New();
	},
	manageEndpoint: function() {
		EndpointActions.Manage();
	},
	render: function() {
		return (
			<Navbar brand='DarkNight' inverse staticTop>
				<Nav>
					<NavItem eventKey={1} onClick={this.manageEndpoint}>Endpoint</NavItem>
					<NavItem eventKey={2} >Member</NavItem>
				</Nav>
			</Navbar>
		);
	}
});
/*
					<DropdownButton eventKey={2} title="Endpoint">
						<MenuItem eventKey="1" onClick={this.newModal}>Endpoint List</MenuItem>
						<MenuItem eventKey="2" onClick={this.newModal}>Add Endpoint</MenuItem>
					</DropdownButton>
					<DropdownButton eventKey={3} title="Member">
						<MenuItem eventKey="1">Add Member</MenuItem>
					</DropdownButton>
*/
module.exports = AdminHeader;
