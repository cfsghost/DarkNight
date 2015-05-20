/** @jsx React.DOM */

var React = require('react');
var Bootstrap = require('react-bootstrap');
var Navbar = Bootstrap.Navbar;
var Nav = Bootstrap.Nav;
var NavItem = Bootstrap.NavItem;
var DropdownButton = Bootstrap.DropdownButton;
var MenuItem = Bootstrap.MenuItem;

var Header = React.createClass({
	render: function() {
		return (
			<Navbar brand="DarkNight">
				<Nav>
					<NavItem eventKey={1} href="#">Home</NavItem>
					<NavItem eventKey={2} href="#">Signup</NavItem>
					<DropdownButton eventKey={3} title="Login">
						<MenuItem eventKey="1">Login</MenuItem>
						<MenuItem eventKey="2">Login by Card Number</MenuItem>
						<MenuItem eventKey="3">Login by Facebook</MenuItem>
						<MenuItem eventKey="4">Login by Google</MenuItem>
					</DropdownButton>
				</Nav>
			</Navbar>
		);
	}
});

module.exports = Header;