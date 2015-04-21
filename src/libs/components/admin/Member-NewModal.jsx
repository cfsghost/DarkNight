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
		var phone = this.refs.phone.getValue() || null;
		var gender = this.refs.male.getInputDOMNode().checked ? 0 : 1
		var idno = this.refs.idno.getValue() || null;
		var cardno = this.refs.cardno.getValue() || null;
		var token = this.refs.token.getValue() || null;

		// Birth
		var year = this.refs.birthYear.getDOMNode().value;
		var month = this.refs.birthMonth.getDOMNode().value;
		var date = this.refs.birthDate.getDOMNode().value;

		var birthday = year + '-' + ('00' + month).slice(-2) + '-' + ('00' + date).slice(-2) + 'T' + '00:00:00Z';

		if (!name || !email)
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
				name: name,
				email: email,
				phone: phone,
				gender: gender,
				birthday: birthday,
				idno: idno,
				cardno: cardno,
				token: token
			}),
			success: function(r) {

				// Notify all of components that the endpoint was changed
				MemberActions.Updated([
					{
						_id: r._id,
						name: name,
						email: email,
						phone: phone,
						gender: gender,
						birthday: birthday,
						idno: idno,
						cardno: cardno,
						tokens: [ token ]
					}
				]);
				this.close();
			}.bind(this)
		});
	},
	render: function() {
		if (!this.state.isOpen)
			return (
				<span />
			);

		var year = [];
		var curYear = new Date().getFullYear();
		for (var y = 1900; y < curYear; y++) {
			year.push(<option>{y}</option>)
		}

		var month = [];
		for (var m = 1; m < 13; m++) {
			month.push(<option>{m}</option>)
		}

		var date = [];
		for (var d = 1; d < 32; d++) {
			date.push(<option>{d}</option>)
		}

		return (
			<Modal bsStyle='primary' title='New Member' onRequestHide={this.close} animation={true}>
				<div className='modal-body'>
					<form>
						<Input type='text' ref='name' label='Name' placeholder='Fred Chien' autoFocus />

						<Input label='Gender'>
							<Input type='radio' ref='male' name='gender' label='Male' />
							<Input type='radio' ref='female' name='gender' label='Female' />
						</Input>

						<Input label='Birth'>
							<div>
								<select ref='birthYear' onChange={this.handleChange}>
									{year}
								</select>
								<span> / </span>
								<select ref='birthMonth' onChange={this.handleChange}>
									{month}
								</select>
								<span> / </span>
								<select ref='birthDate' onChange={this.handleChange}>
									{date}
								</select>
							</div>
						</Input>
						<Input type='text' ref='idno' label='ID Number' placeholder='F126622222' value={this.state.idno} onChange={this.handleChange} />

						<Input type='text' ref='email' label='E-mail' placeholder='cfsghost@gmail.com' />
						<Input type='text' ref='phone' label='Phone' placeholder='0926333572' />

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
