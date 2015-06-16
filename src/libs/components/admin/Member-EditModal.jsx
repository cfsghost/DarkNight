/** @jsx React.DOM */

var React = require('react');
var Bootstrap = require('react-bootstrap');
var Modal = Bootstrap.Modal;
var Button = Bootstrap.Button;
var Input = Bootstrap.Input;
var TabbedArea = Bootstrap.TabbedArea;
var TabPane = Bootstrap.TabPane;
//var Select = require('react-bootstrap-select');
var MemberAwardsManager = require('./Member-AwardsManager');
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
			phone: '',
			gender: 0,
			birthday: '',
			idno: '',
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
			birthday: member.birthday,
			idno: member.idno,
			email: member.email,
			phone: member.phone,
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
				phone: this.state.phone,
				birthday: this.state.birthday,
				idno: this.state.idno,
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
						phone: this.state.phone,
						gender: gender,
						birthday: this.state.birthday,
						idno: this.state.idno,
						cardno: this.state.cardno,
						tokens: [ this.state.token ],
						created: r.created.split('T')[0],
						updated: r.updated.replace('T', ' ').split('.')[0]
					}
				]);
				this.close();
			}.bind(this)
		});
	},
	handleChange: function() {
		var year = this.refs.birthYear.getDOMNode().value;
		var month = this.refs.birthMonth.getDOMNode().value;
		var date = this.refs.birthDate.getDOMNode().value;

		var birthday = year + '-' + ('00' + month).slice(-2) + '-' + ('00' + date).slice(-2) + 'T' + '00:00:00Z';

		this.setState({
			name: this.refs.name.getValue(),
			email: this.refs.email.getValue(),
			idno: this.refs.idno.getValue(),
			phone: this.refs.phone.getValue(),
			gender: this.refs.male.getInputDOMNode().checked ? 0 : 1,
			birthday: birthday,
			cardno: this.refs.cardno.getValue(),
			token: this.refs.token.getValue()
		});
	},
	render: function() {
		if (!this.state.isOpen)
			return (
				<span />
			);

		// Birthday field
		var birth = new Date(this.state.birthday);
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
			<Modal bsStyle='primary' title='Member Details' onRequestHide={this.close} animation={true} backdrop='static'>
				<div className='modal-body'>
					<TabbedArea defaultActiveKey={1}>
						<TabPane eventKey={1} tab='Profile'>

							<form>
								<Input type='text' ref='name' label='Name' placeholder='Fred Chien' value={this.state.name} onChange={this.handleChange} autoFocus />

								<Input label='Gender'>
									<Input type='radio' ref='male' name='gender' label='Male' defaultChecked={this.state.gender ? false : true}  />
									<Input type='radio' ref='female' name='gender' label='Female' defaultChecked={this.state.gender ? true : false} />
								</Input>

								<Input label='Birth'>
									<div>
										<select ref='birthYear' value={birth.getFullYear()} onChange={this.handleChange}>
											{year}
										</select>
										<span> / </span>
										<select ref='birthMonth' value={birth.getMonth() + 1} onChange={this.handleChange}>
											{month}
										</select>
										<span> / </span>
										<select ref='birthDate' value={birth.getDate()} onChange={this.handleChange}>
											{date}
										</select>
									</div>
								</Input>
								<Input type='text' ref='idno' label='ID Number' placeholder='F126622222' value={this.state.idno} onChange={this.handleChange} />

								<Input type='text' ref='email' label='E-mail' placeholder='cfsghost@gmail.com' value={this.state.email} onChange={this.handleChange} />
								<Input type='text' ref='phone' label='Phone' placeholder='0926333572' value={this.state.phone} onChange={this.handleChange} />

								<Input type='text' ref='cardno' label='Card Number' placeholder='1' value={this.state.cardno} onChange={this.handleChange} />
								<Input type='text' ref='token' label='Token' placeholder='0a020e01' value={this.state.token} onChange={this.handleChange} />
							</form>
						</TabPane>
						<TabPane eventKey={2} tab='Awards'>
							<MemberAwardsManager memberId={this.state.id} />
						</TabPane>
					</TabbedArea>
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
