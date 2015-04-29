/** @jsx React.DOM */

var React = require('react');
var Bootstrap = require('react-bootstrap');
var Modal = Bootstrap.Modal;
var Button = Bootstrap.Button;
var Input = Bootstrap.Input;
var Col = Bootstrap.Col;
var Dropzone = require('../Dropzone');

var AwardStore = require('../../stores/Award');
var AwardActions = require('../../actions/Award');

var NewAwardModal = React.createClass({
	getInitialState: function() {
		return {
			isOpen: false,
			isBusy: false,
			iconId: null
		};
	},
	componentDidMount: function() {
		AwardStore.on('OpenNewModal', this.open);
		AwardStore.on('CloseNewModal', this.close);
		AwardStore.on('UpdateNewModal', this._update);
	},
	componentWillUnmount: function() {
		AwardStore.removeListener('OpenNewModal', this.open);
		AwardStore.removeListener('CloseNewModal', this.close);
		AwardStore.removeListener('UpdateNewModal', this._update);
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
		var points = this.refs.points.getValue() || null;
		var desc = this.refs.desc.getValue() || null;

		if (!name || !points)
			return;

		this.setState({
			isBusy: true
		});

		$.ajax({
			type: 'post',
			url: '/awards',
			processData: false,
			contentType: 'application/json',
			data: JSON.stringify({
				name: name,
				points: points,
				desc: desc,
				icon: this.iconId
			}),
			success: function(r) {

				// Notify all of components that the endpoint was changed
				AwardActions.Updated([
					{
						_id: r._id,
						name: name,
						desc: desc,
						points: points,
						icon: this.iconId,
						created: r.created
					}
				]);
				this.close();
			}.bind(this)
		});
	},
	upload: function() {
		this.setState({
			isBusy: true
		});
	},
	uploaded: function() {
		this.setState({
			isBusy: false
		});
	},
	uploadSuccess: function(response) {
		console.log(response);
		this.setState({
			iconId: response.id
		});
	},
	render: function() {
		if (!this.state.isOpen)
			return (
				<span />
			);

		return (
			<Modal bsStyle='primary' title='New Award' onRequestHide={this.close} animation={true} backdrop='static'>
				<div className='modal-body'>
					<form>
						<Input type='text' ref='name' label='Name' placeholder='Top Hero' autoFocus />

						<Input type='text' ref='desc' label='Description' placeholder='You are best' />

						<Input type='text' ref='points' label='Points' placeholder='1' />
					</form>

					<Input label='Icon' help='Drop icon file here or click to upload' wrapperClassName='wrapper'>
						<Dropzone style={{ height: '140px', width: '100%', display: 'block', border: '2px dashed #0087f7', borderRadius: '5px', background: '#f0f0f0' }} onSending={this.upload} onCompleted={this.uploaded} onSuccess={this.uploadSuccess}/>
					</Input>
				</div>
				<div className='modal-footer'>
					<Button onClick={this.close}>Cancel</Button>
					<Button bsStyle='primary' onClick={this.add} disabled={this.state.isBusy}>Add</Button>
				</div>
			</Modal>
		);
	},
	_update: function(status) {

		switch(status) {
		case 'busy':
			this.setState({
				isBusy: true
			});
			break;
		}
	}
});

module.exports = NewAwardModal;
