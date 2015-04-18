/** @jsx React.DOM */

var React = require('react');
var Bootstrap = require('react-bootstrap');
var Modal = Bootstrap.Modal;
var Glyphicon = Bootstrap.Glyphicon;
var ButtonToolbar = Bootstrap.ButtonToolbar;
var Button = Bootstrap.Button;
var Input = Bootstrap.Input;
var Navbar = Bootstrap.Navbar;
var Nav = Bootstrap.Nav;
var NavItem = Bootstrap.NavItem;
var MemberStore = require('../../stores/Member');
var MemberActions = require('../../actions/Member');

var NewModal = require('./Member-NewModal');
var ListView = require('./Member-ListView');

var Toolbar = React.createClass({
	newModal: function() {
		MemberActions.New();
	},
	render: function() {
		return (
			<ButtonToolbar>
				<Button onClick={this.newModal}><Glyphicon glyph='plus' /> Add</Button>
			</ButtonToolbar>
		);
	}
});

var Member = React.createClass({
	getInitialState: function() {
		return {
			isOpen: false
		};
	},
	componentDidMount: function() {
		MemberStore.on('OpenManagement', this._openManagement);
		MemberStore.on('CloseManagement', this._closeManagement);
	},
	componentWillUnmount: function() {
		MemberStore.removeListener('OpenManagement', this._openManagement);
		MemberStore.removeListener('CloseManagement', this._closeManagement);
	},
	render: function() {
		if (!this.state.isOpen)
			return (<span />);

		return (
			<div>
				<NewModal />
				<Toolbar />
				<ListView />
			</div>
		);
	},
	_openManagement: function() {
		this.setState({
			isOpen: true 
		});
	},
	_closeManagement: function() {
		this.setState({
			isOpen: false 
		});
	}
});

module.exports = Member;
