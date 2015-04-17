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
			name: member.name
		});
	},
	close: function() {
		this.setState({
			isOpen: false,
			isBusy: false
		});
	},
	save: function() {
		if (!this.state.id)
			return;

		if (!this.state.name)
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
				name: this.state.name
			}),
			success: function(r) {

				// Notify all of components that the member was changed
				MemberActions.Updated([
					{
						_id: this.state.id,
						name: this.state.name
					}
				]);
				this.close();
			}.bind(this)
		});
	},
	handleChange: function() {
		this.setState({
			name: this.refs.name.getValue()
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
						<Input
							type='text'
							ref='name'
							label='Member Name'
							placeholder='Hackathon Taiwan Entry'
							onChange={this.handleChange}
							value={this.state.name} />
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
