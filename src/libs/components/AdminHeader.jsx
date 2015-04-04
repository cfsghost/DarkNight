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
		console.log(123123123);
	},
	render: function() {
		return (
			<Navbar>
				<Nav>
					<NavItem eventKey={1} href="#">DarkNight</NavItem>
					<DropdownButton eventKey={2} title="Endpoint">
						<MenuItem eventKey="1" onClick={this.newModal}>Add Endpoint</MenuItem>
					</DropdownButton>
					<DropdownButton eventKey={3} title="Member">
						<MenuItem eventKey="1">Add Member</MenuItem>
					</DropdownButton>
				</Nav>
			</Navbar>
		);
	}
});

module.exports = AdminHeader;
