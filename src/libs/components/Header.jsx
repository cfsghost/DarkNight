/** @jsx React.DOM */

var React = require('react');
var Bootstrap = require('react-bootstrap');
var Navbar = Bootstrap.Navbar;
var Nav = Bootstrap.Nav;
var NavItem = Bootstrap.NavItem;
var DropdownButton = Bootstrap.DropdownButton;
var MenuItem = Bootstrap.MenuItem;
var Avatar = require('./Avatar');

var Header = React.createClass({
	render: function() {
		var loginStateItem = <MenuItem href="/login">Login</MenuItem>;

		if (user) {
			var loginState = <span><Avatar email={user.email} size={20} /> <span>{user.name}</span></span>;

			loginStateItem = (
				<DropdownButton eventKey={4} title={loginState}>
					<MenuItem divider />
					<NavItem href='/logout'>Sign Out</NavItem>
				</DropdownButton>
			);
		}

		return (
			<Navbar brand="DarkNight">
				<Nav>
					<NavItem eventKey={1} href="/">Home</NavItem>
					<DropdownButton eventKey={2} title="Signup">
						<MenuItem eventKey="1" href="/signup/Local">Signup</MenuItem>
						<MenuItem eventKey="2" href="/signup/ID">Signup by Card ID</MenuItem>
						<MenuItem eventKey="3" href="/signup/FB">Signup by Facebook</MenuItem>
						<MenuItem eventKey="4" href="/signup/Google">Signup by Google</MenuItem>
					</DropdownButton>
					<DropdownButton eventKey={3} title="Login">
						<MenuItem eventKey="1" href="/login/Local">Login</MenuItem>
						<MenuItem eventKey="2" href="/login/ID">Login by Card ID</MenuItem>
						<MenuItem eventKey="3" href="/login/FB">Login by Facebook</MenuItem>
						<MenuItem eventKey="4" href="/login/Google">Login by Google</MenuItem>
					</DropdownButton>
				</Nav>
				<Nav right>
					{loginStateItem}
				</Nav>
			</Navbar>
		);
	}
});

module.exports = Header;
