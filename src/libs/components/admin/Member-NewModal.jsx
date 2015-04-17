/** @jsx React.DOM */

var React = require('react');
var Bootstrap = require('react-bootstrap');
var Modal = Bootstrap.Modal;
var Button = Bootstrap.Button;
var Input = Bootstrap.Input;
var MemberStore = require('../../stores/Member');
var MemberActions = require('../../actions/Member');

var NewMemberModal = React.createClass({
	getInitialState: function() {
		return {
			isOpen: false,
			isBusy: false
		};
	},
	componentDidMount: function() {
		MemberStore.on('OpenNewModal', this.open);
		MemberStore.on('CloseNewModal', this.close);
	},
	componentWillUnmount: function() {
		MemberStore.removeListener('OpenNewModal', this.open);
		MemberStore.removeListener('CloseNewModal', this.close);
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
		var email = this.refs.email.getValue() || null;
		var gender = this.refs.gender.getValue() || null;
		console.log(gender);
		return;
		if (!name)
			return;

		this.setState({
			isBusy: true
		});

		$.ajax({
			type: 'post',
			url: '/members',
			processData: false,
			contentType: 'application/json',
			data: JSON.stringify({
				name: this.refs.name.getValue(),
				email: this.refs.email.getValue()
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
			<Modal bsStyle='primary' title='New Member' onRequestHide={this.close} animation={true}>
				<div className='modal-body'>
					<form>
						<Input type='text' ref='name' label='Name' placeholder='Fred Chien' autoFocus />
						<Input type='text' ref='email' label='E-mail' placeholder='cfsghost@gmail.com' />

						<Input label='Gender'>
							<Input type='radio' ref='gender' name='gender' label='Male' />
							<Input type='radio' ref='gender' name='gender' label='Female' />
						</Input>

						<Input type='text' ref='cardno' label='Card Number' placeholder='1' />
						<Input type='text' ref='token' label='Token' placeholder='0a020e01' />
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

module.exports = NewMemberModal;
