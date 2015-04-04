/** @jsx React.DOM */

var React = require('react');
var Bootstrap = require('react-bootstrap');
var Modal = Bootstrap.Modal;
var Button = Bootstrap.Button;
var Input = Bootstrap.Input;
var EndpointStore = require('../../stores/Endpoint');
var EndpointActions = require('../../actions/Endpoint');

var NewEndpointModal = React.createClass({
	close: function() {
		this.props.hidden = true;
		this.forceUpdate();
	},
	add: function() {
		console.log(this.refs.name.getValue());
		this.close();
	},
	render: function() {
		if (this.props.hidden)
			return (
				<div />
			);

		return (
			<Modal hidden={true} bsStyle='primary' title='New Endpoint' onRequestHide={this.close} animation={true}>
				<div className='modal-body'>
					<form>
						<Input type='text' ref='name' label='Endpoint Name' placeholder='Hackathon Taiwan Entry' autoFocus />
					</form>
				</div>
				<div className='modal-footer'>
					<Button onClick={this.close}>Cancel</Button>
					<Button bsStyle='primary' onClick={this.add}>Add</Button>
				</div>
			</Modal>
		);
	}
});

module.exports = NewEndpointModal;
