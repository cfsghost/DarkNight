/** @jsx React.DOM */

var React = require('react');
var Bootstrap = require('react-bootstrap');
var Modal = Bootstrap.Modal;
var Button = Bootstrap.Button;
var Input = Bootstrap.Input;
var EndpointStore = require('../../stores/Endpoint');
var EndpointActions = require('../../actions/Endpoint');

var NewEndpointModal = React.createClass({
	getInitialState: function() {
		return {
			isOpen: false,
			isBusy: false
		};
	},
	componentDidMount: function() {
		EndpointStore.on('OpenNewModal', this.open);
		EndpointStore.on('CloseNewModal', this.close);
	},
	componentWillUnmount: function() {
		EndpointStore.removeListener('OpenNewModal', this.open);
		EndpointStore.removeListener('CloseNewModal', this.close);
	},
	open: function() {
		this.setState({
			isOpen: true
		});
	},
	close: function() {
		this.setState({
			isOpen: false,
			isBusy: false
		});
	},
	add: function() {
		var name = this.refs.name.getValue() || null;
		if (!name)
			return;

		this.setState({
			isBusy: true
		});

		$.ajax({
			type: 'post',
			url: '/endpoints',
			processData: false,
			contentType: 'application/json',
			data: JSON.stringify({
				name: this.refs.name.getValue()
			}),
			success: function(r) {
				this.close();
			}.bind(this)
		});
	},
	render: function() {
		if (!this.state.isOpen)
			return (
				<span />
			);

		return (
			<Modal bsStyle='primary' title='New Endpoint' onRequestHide={this.close} animation={true}>
				<div className='modal-body'>
					<form>
						<Input type='text' ref='name' label='Endpoint Name' placeholder='Hackathon Taiwan Entry' autoFocus />
					</form>
				</div>
				<div className='modal-footer'>
					<Button onClick={this.close}>Cancel</Button>
					<Button bsStyle='primary' onClick={this.add} disabled={this.state.isBusy}>Add</Button>
				</div>
			</Modal>
		);
	}
});

module.exports = NewEndpointModal;
