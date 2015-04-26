/** @jsx React.DOM */

var React = require('react');
var Bootstrap = require('react-bootstrap');
var Modal = Bootstrap.Modal;
var Button = Bootstrap.Button;
var Input = Bootstrap.Input;
//var Select = require('react-bootstrap-select');
var AwardStore = require('../../stores/Award');
var AwardActions = require('../../actions/Award');


var EditModal = React.createClass({
	getInitialState: function() {
		return {
			isOpen: false,
			isBusy: false,
			id: null,
			name: '',
			points: 0
		};
	},
	componentDidMount: function() {
		AwardStore.on('OpenEditModal', this.open);
		AwardStore.on('CloseEditModal', this.close);
	},
	componentWillUnmount: function() {
		AwardStore.removeListener('OpenEditModal', this.open);
		AwardStore.removeListener('CloseEditModal', this.close);
	},
	open: function(award) {
		this.setState({
			isOpen: true,
			id: award._id,
			name: award.name,
			points: award.points
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

		if (!this.state.points)
			return;

		this.setState({
			isBusy: true
		});

		$.ajax({
			type: 'put',
			url: '/award/' + this.state.id,
			processData: false,
			contentType: 'application/json',
			data: JSON.stringify({
				name: this.state.name,
				points: this.state.points
			}),
			success: function(r) {

				// Notify all of components that the award was changed
				AwardActions.Updated([
					{
						_id: this.state.id,
						name: this.state.name,
						points: this.state.points
					}
				]);
				this.close();
			}.bind(this)
		});
	},
	handleChange: function() {
		this.setState({
			name: this.refs.name.getValue(),
			points: this.refs.points.getValue()
		});
	},
	render: function() {
		if (!this.state.isOpen)
			return (
				<span />
			);

		return (
			<Modal bsStyle='primary' title='Award Details' onRequestHide={this.close} animation={true} backdrop='static'>
				<div className='modal-body'>
					<form>
						<label>ID</label>
						<div>{this.state.id}</div>

						<Input type='text' ref='name' label='Name' placeholder='Top Hero' value={this.state.name} onChange={this.handleChange} autoFocus />
						<Input type='text' ref='points' label='Points' placeholder='1' value={this.state.points} onChange={this.handleChange} />
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
