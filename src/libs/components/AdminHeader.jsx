/** @jsx React.DOM */

var React = require('react');

// Router
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

// UI Components
var Bootstrap = require('react-bootstrap');
var Navbar = Bootstrap.Navbar;
var Nav = Bootstrap.Nav;
var NavItem = Bootstrap.NavItem;
var DropdownButton = Bootstrap.DropdownButton;
var MenuItem = Bootstrap.MenuItem;

var EndpointActions = require('../actions/Endpoint');
var MemberActions = require('../actions/Member');

var AdminHeader = React.createClass({
	contextTypes: {
		router: React.PropTypes.func
	},
	getInitialState: function() {
		return {
			endpoint: false,
			member: false,
			award: false
		};
	},
	manageEndpoint: function() {
		this.setState({
			endpoint: true,
			member: false,
			award: false
		});
	},
	manageMember: function() {
		this.setState({
			endpoint: false,
			member: true,
			award: false
		});
	},
	manageAward: function() {
		this.setState({
			endpoint: false,
			member: false,
			award: true
		});
	},
	render: function() {
		return (
			<Navbar brand='DarkNight' inverse fixedTop>
				<Nav>
					<NavItem eventKey={1} href='#/endpoints' onClick={this.manageEndpoint} active={this.state.endpoint}>Endpoint</NavItem>
					<NavItem eventKey={2} href='#/members' onClick={this.manageMember} active={this.state.member}>Member</NavItem>
					<NavItem eventKey={2} href='#/awards' onClick={this.manageAward} active={this.state.award}>Award</NavItem>
				</Nav>
				<Nav right>
					<DropdownButton eventKey={4} title='Fred'>
						<MenuItem divider />
						<NavItem href='/logout'>Sign Out</NavItem>
					</DropdownButton>
				</Nav>
			</Navbar>
		);
	}
});

module.exports = AdminHeader;
