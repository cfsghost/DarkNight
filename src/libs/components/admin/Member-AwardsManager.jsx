/** @jsx React.DOM */

var React = require('react');
var Bootstrap = require('react-bootstrap');
var Glyphicon = Bootstrap.Glyphicon;
var Panel = Bootstrap.Panel;
var Col = Bootstrap.Col;
var Button = Bootstrap.Button;
var OverlayTrigger = Bootstrap.OverlayTrigger;
var Popover = Bootstrap.Popover;
var MemberStore = require('../../stores/Member');
var MemberActions = require('../../actions/Member');

var Item = React.createClass({
	render: function() {

	console.log(this.props.award);

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
			awards: []
		};
	},
	getDefaultProps: function() {
		return {
			memberId: ''
		};
	},
	componentDidMount: function() {
		MemberStore.on('AwardsUpdated', this._update);

		// Fetching member list 
		MemberActions.FetchAwards(this.props.memberId);
	},
	componentWillUnmount: function() {
		MemberStore.removeListener('AwardsUpdated', this._update);
	},
	componentWillReceiveProps: function(nextProps) {
		MemberActions.FetchAwards(nextProps.memberId);
	},
	render: function() {
		var items = [];

		for (var id in this.state.awards) {
			items.push(<Item award={this.state.awards[id]}/>);
		}

		var awardList = (
			<Popover title='Add Award'></Popover>
		);

		items.push(
			<Col sm={2} xs={2} md={4}>
				<OverlayTrigger trigger='click' placement='right' overlay={awardList}>
					<Button bsStyle='success' style={{ 'text-align': 'center' }}>
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

		this.setState({
			awards: awards
		});
	}
});

module.exports = MemberAwardsManager;
