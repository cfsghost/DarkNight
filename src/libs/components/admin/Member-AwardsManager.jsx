/** @jsx React.DOM */

var React = require('react');
var Bootstrap = require('react-bootstrap');
var Glyphicon = Bootstrap.Glyphicon;
var Panel = Bootstrap.Panel;
var Col = Bootstrap.Col;
var Button = Bootstrap.Button;
var OverlayTrigger = Bootstrap.OverlayTrigger;
var Popover = Bootstrap.Popover;
var ListGroup = Bootstrap.ListGroup;
var ListGroupItem = Bootstrap.ListGroupItem;
var MemberStore = require('../../stores/Member');
var MemberActions = require('../../actions/Member');
var AwardStore = require('../../stores/Award');
var AwardActions = require('../../actions/Award');

var Item = React.createClass({
	render: function() {

		return (
			<Col xs={6} md={4}>
				<div className='thumbnail'>
					<img src={'/award/' + this.props.award.icon + '/icon'} />
				</div>
			</Col>
		);
	}
});

var MemberAwardsManager = React.createClass({
	getInitialState: function() {
		return {
			awards: [],
			availableAwards: []
		};
	},
	getDefaultProps: function() {
		return {
			memberId: ''
		};
	},
	componentDidMount: function() {
		AwardStore.on('Refresh', this._updateAvailAwards);
		MemberStore.on('AwardsUpdated', this._update);

		// Fetching member list 
		MemberActions.FetchAwards(this.props.memberId);

		// Fetching available awards
		AwardActions.Fetch(1, 100);
	},
	componentWillUnmount: function() {
		MemberStore.removeListener('AwardsUpdated', this._update);
		AwardStore.removeListener('Refresh', this._updateAvailAwards);
	},
	componentWillReceiveProps: function(nextProps) {
		MemberActions.FetchAwards(nextProps.memberId);
	},
	addAward: function(awardId) {
		console.log(awardId);
		MemberActions.AddAwards(this.props.memberId, [ awardId ])
	},
	render: function() {
		var items = [];

		// List all awards this member have
		for (var id in this.state.awards) {
			items.push(<Item award={this.state.awards[id].award}/>);
		}

		var availAwards = []
		for (var index in this.state.availableAwards) {
			var avail = this.state.availableAwards[index];
			var handle = (function(id) {
				return function() {
					this.addAward(id);
				}.bind(this);
			}.bind(this))(avail._id);

			availAwards.push(
				<ListGroupItem onClick={handle}>
					<img src={'/award/' + avail.icon + '/icon'} width='20%' />
					<span>{avail.name}</span>
				</ListGroupItem>
			);
		}

		var awardList = (
			<Popover title='Add Award'>
				<ListGroup>
					{availAwards}
				</ListGroup>
			</Popover>
		);

		items.push(
			<Col xs={6} md={4}>
				<OverlayTrigger trigger='click' placement='right' overlay={awardList}>
					<Button bsStyle='success' style={{ 'text-align': 'center', width: '100%' }}>
						<Glyphicon glyph='plus' style={{ 'font-size': '60px', margin: '20px' }} />
						<div>Add</div>
					</Button>
				</OverlayTrigger>
			</Col>
		);

		return (
			<Panel className='well'>
				{items}
			</Panel>
		);
	},
	_update: function(awards) {

		for (var index in awards) {
			var award = awards[index];

			this.state.awards[award._id] = award;
		}

		this.forceUpdate();
	},
	_updateAvailAwards: function(info, awards) {

		this.setState({
			availableAwards: awards
		});
	}
});

module.exports = MemberAwardsManager;
