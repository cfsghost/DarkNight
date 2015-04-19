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
var EndpointStore = require('../../stores/Endpoint');
var EndpointActions = require('../../actions/Endpoint');

var NewModal = require('./Endpoint-NewModal');
var ListView = require('./Endpoint-ListView');

var Toolbar = React.createClass({
	newModal: function() {
		EndpointActions.New();
	},
	render: function() {
		return (
			<ButtonToolbar>
				<Button onClick={this.newModal}><Glyphicon glyph='plus' /> Add</Button>
			</ButtonToolbar>
		);
	}
});

var Endpoint = React.createClass({
	getInitialState: function() {
		return {
			//isOpen: false
			isOpen: true
		};
	},
	componentDidMount: function() {
		EndpointStore.on('OpenManagement', this._openManagement);
		EndpointStore.on('CloseManagement', this._closeManagement);
	},
	componentWillUnmount: function() {
		EndpointStore.removeListener('OpenManagement', this._openManagement);
		EndpointStore.removeListener('CloseManagement', this._closeManagement);
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

module.exports = Endpoint;
