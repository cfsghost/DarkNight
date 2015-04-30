/** @jsx React.DOM */

var React = require('react');
var Bootstrap = require('react-bootstrap');
var Grids = Bootstrap.Grids;
var Col = Bootstrap.Col;
var Row = Bootstrap.Row;
var MemberStore = require('../../stores/Member');
var MemberActions = require('../../actions/Member');

var Item = React.createClass({
	render: function() {

	console.log(this.props.award);

		return (
			<Col sm={6} md={4}>
				<div className='thumbnail'>
					<img src={'/award/' + this.props.award.icon + '/icon'} />
				</div>
			</Col>
		);
	}
});

var AwardsManager = React.createClass({
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
console.log(this.props.memberId);
		// Fetching member list 
//		MemberActions.FetchAwards(this.props.memberId);
	},
	componentWillUnmount: function() {
		MemberStore.removeListener('AwardsUpdated', this._update);
	},
	componentWillReceiveProps: function(nextProps) {
console.log(nextProps);
//		MemberActions.FetchAwards(nextProps.memberId);
	},
	render: function() {
		var items = [];

		for (var id in this.state.awards) {
			items.push(<Item award={this.state.awards[id]}/>);
		}
console.log(123123123);
		return (
			<Grids>
				<Row>
				</Row>
			</Grids>
		);
	},
	_update: function(awards) {

console.log(123123123);
		this.setState({
			awards: awards
		});
//		this.forceUpdate();
	}
});

module.exports = AwardsManager;
