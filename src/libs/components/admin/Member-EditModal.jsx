/** @jsx React.DOM */

var React = require('react');
var Bootstrap = require('react-bootstrap');
var Modal = Bootstrap.Modal;
var Button = Bootstrap.Button;
var Input = Bootstrap.Input;
var MemberStore = require('../../stores/Member');
var MemberActions = require('../../actions/Member');

var EditModal = React.createClass({
	getInitialState: function() {
		return {
			isOpen: false,
			isBusy: false,
			id: null,
			name: '',
			email: '',
			gender: 0,
			cardno: '',
			token: ''
		};
	},
	componentDidMount: function() {
		MemberStore.on('OpenEditModal', this.open);
		MemberStore.on('CloseEditModal', this.close);
	},
	componentWillUnmount: function() {
		MemberStore.removeListener('OpenEditModal', this.open);
		MemberStore.removeListener('CloseEditModal', this.close);
	},
	open: function(member) {
		this.setState({
			isOpen: true,
			id: member._id,
			name: member.name,
			email: member.email,
			gender: member.gender,
			cardno: member.cardno,
			token: member.tokens ? member.tokens[0] || '' : ''
		});
	},
	close: function() {
		this.setState({
			isOpen: false,
			isBusy: false
		});
	},
	save: function() {
		var gender = this.refs.male.getInputDOMNode().checked ? 0 : 1

		if (!this.state.id)
			return;

		if (!this.state.name)
			return;

		if (!this.state.email)
			return;

		this.setState({
			isBusy: true
		});

		$.ajax({
			type: 'put',
			url: '/member/' + this.state.id,
			processData: false,
			contentType: 'application/json',
			data: JSON.stringify({
				name: this.state.name,
				email: this.state.email,
				gender: gender,
				cardno: this.state.cardno,
				token: this.state.token
			}),
			success: function(r) {

				// Notify all of components that the member was changed
				MemberActions.Updated([
					{
						_id: this.state.id,
						name: this.state.name,
						email: this.state.email,
						gender: gender,
						cardno: this.state.cardno,
						tokens: [ this.state.token ]
					}
				]);
				this.close();
			}.bind(this)
		});
	},
	handleChange: function() {
		this.setState({
			name: this.refs.name.getValue(),
			email: this.refs.email.getValue(),
			gender: this.refs.male.getInputDOMNode().checked ? 0 : 1,
			cardno: this.refs.cardno.getValue(),
			token: this.refs.token.getValue()
		});
	},
	render: function() {
		if (!this.state.isOpen)
			return (
				<span />
			);

		return (
			<Modal bsStyle='primary' title='Member Details' onRequestHide={this.close} animation={true}>
				<div className='modal-body'>
					<form>
						<label>ID</label>
						<div>{this.state.id}</div>

						<Input type='text' ref='name' label='Name' placeholder='Fred Chien' value={this.state.name} onChange={this.handleChange} autoFocus />
						<Input type='text' ref='email' label='E-mail' placeholder='cfsghost@gmail.com' value={this.state.email} onChange={this.handleChange} />

						<Input label='Gender'>
							<Input type='radio' ref='male' name='gender' label='Male' defaultChecked={this.state.gender ? false : true}  />
							<Input type='radio' ref='female' name='gender' label='Female' defaultChecked={this.state.gender ? true : false} />
						</Input>

						<Input type='text' ref='cardno' label='Card Number' placeholder='1' value={this.state.cardno} onChange={this.handleChange} />
						<Input type='text' ref='token' label='Token' placeholder='0a020e01' value={this.state.token} onChange={this.handleChange} />
					</form>
				</div>
				<div className='modal-footer'>
					<Button onClick={this.close}>Cancel</Button>
					<Button bsStyle='primary' onClick={this.save} disabled={this.state.isBusy}>Save</Button>
				</div>
			</Modal>
		);
	}
});

module.exports = EditModal;
