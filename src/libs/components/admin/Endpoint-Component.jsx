/** @jsx React.DOM */

var React = require('react');
var Bootstrap = require('react-bootstrap');
var Modal = Bootstrap.Modal;
var Button = Bootstrap.Button;
var Input = Bootstrap.Input;
var EndpointStore = require('../../stores/Endpoint');
var EndpointActions = require('../../actions/Endpoint');

var NewModal = require('./Endpoint-NewModal');

var Endpoint = React.createClass({
	getInitialState: function() {
		return {
			openNewModal: false
		};
	},
	componentDidMount: function() {
		EndpointStore.on('OpenNewModal', this._openNewModal);
	},
	componentWillUnmount: function() {
		EndpointStore.removeListener('OpenNewModal', this._openNewModal);
	},
	render: function() {
		return (
			<NewModal hidden={!this.state.openNewModal} />
		);
	},
	_openNewModal: function() {
		this.setState({
			openNewModal: true
		});
	}
});

module.exports = React.createFactory(Endpoint);
