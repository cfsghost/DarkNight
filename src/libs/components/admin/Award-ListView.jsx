/** @jsx React.DOM */

var React = require('react');
var Bootstrap = require('react-bootstrap');
var Table = Bootstrap.Table;
var Label = Bootstrap.Label;
var AwardStore = require('../../stores/Award');
var AwardActions = require('../../actions/Award');

var EditModal = require('./Award-EditModal');

var Item = React.createClass({
	editModal: function() {
		AwardActions.Open(this.props.award);
	},
	render: function() {
		var styles = {
			cursor: 'pointer'
		};

		return (
			<tr href='#' style={styles} onClick={this.editModal}>
				<td>{this.props.serialno}</td>
				<td>{this.props.award.name}</td>
				<td>{this.props.award.points}</td>
			</tr>
		);
	}
});

var ListView = React.createClass({
	getInitialState: function() {
		return {
			awards: {},
			loading: false
		};
	},
	getDefaultProps: function() {
		return {
			page: 1,
			perPage: 100
		};
	},
	componentDidMount: function() {

		AwardStore.on('Refresh', this._refresh);
		AwardStore.on('AwardsUpdated', this._update);
		AwardStore.on('Loading', this._loading);

		// Fetching award list 
		AwardActions.Fetch(this.props.page, this.props.perPage);
	},
	componentWillUnmount: function() {
		AwardStore.removeListener('AwardsUpdated', this._update);
		AwardStore.removeListener('Refresh', this._refresh);
		AwardStore.removeListener('Loading', this._loading);
	},
	componentWillReceiveProps: function(nextProps) {

		AwardActions.Fetch(nextProps.page, nextProps.perPage);
	},
	render: function() {
		var rows = [];

		var serialno = 1;
		for (var id in this.state.awards) {
			var award = this.state.awards[id];
			rows.push(<Item serialno={serialno} award={award}/>);
			serialno++;
		}

		return (
			<div>
				<EditModal />
				<Table responsive striped hover>
					<thead>
						<tr>
							<th>#</th>
							<th>Name</th>
							<th>Points</th>
							<th>Created</th>
						</tr>
					</thead>
					<tbody>{rows}</tbody>
				</Table>
			</div>
		);
	},
	_loading: function() {
		this.setState({
			loading: true
		});
	},
	_update: function(awards) {
		for (var index in awards) {
			var award = awards[index];

			this.state.awards[award._id] = award;
		}

		this.forceUpdate();
	},
	_refresh: function(info, awards) {

		if (this.isMounted()) {
			this.setState({
				awards: awards,
				loading: false
			});
		}
	}
});

module.exports = ListView;
