/** @jsx React.DOM */

var React = require('react');
var Bootstrap = require('react-bootstrap');
var EndpointStore = require('../../stores/Endpoint');
var EndpointActions = require('../../actions/Endpoint');

var ListView = React.createClass({
	getInitialState: function() {
		return {
		};
	},
	componentDidMount: function() {
		//EndpointStore.on('OpenNewModal', this._openNewModal);
	},
	componentWillUnmount: function() {
		//EndpointStore.removeListener('OpenNewModal', this._openNewModal);
	},
	render: function() {
		return (
			<div />
		);
	}
});

module.exports = React.createFactory(ListView);
