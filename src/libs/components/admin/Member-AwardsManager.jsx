/** @jsx React.DOM */

var React = require('react');
var Bootstrap = require('react-bootstrap');
var Glyphicon = Bootstrap.Glyphicon;
var Grid = Bootstrap.Grid;
var Col = Bootstrap.Col;
var Row = Bootstrap.Row;
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
console.log(nextProps);
		MemberActions.FetchAwards(nextProps.memberId);
	},
	render: function() {
		var items = [];

		for (var id in this.state.awards) {
			items.push(<Item award={this.state.awards[id]}/>);
		}

		items.push(
			<Col sm={6} xs={2} md={4}>
				<div className='thumbnail'>
					<Glyphicon glyph='plus' />
				</div>
			</Col>
		);

		return (
			<Grid>
				<Row>
					{items}
				</Row>
			</Grid>
		);
	},
	_update: function(awards) {

		this.setState({
			awards: awards
		});
	}
});

module.exports = MemberAwardsManager;
