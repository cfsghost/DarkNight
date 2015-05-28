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
					<NavItem eventKey={1} href="/">Home</NavItem>
					<NavItem eventKey={2} href="/Signup">Signup</NavItem>
					<DropdownButton eventKey={3} title="Login">
						<MenuItem eventKey="1" href="/login/Local">Login</MenuItem>
						<MenuItem eventKey="2" href="/login/ID">Login by Card ID</MenuItem>
						<MenuItem eventKey="3" href="/login/FB">Login by Facebook</MenuItem>
						<MenuItem eventKey="4" href="/login/Google">Login by Google</MenuItem>
					</DropdownButton>
				</Nav>
			</Navbar>
		);
	}
});

module.exports = Header;