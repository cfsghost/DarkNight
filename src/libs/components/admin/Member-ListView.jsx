/** @jsx React.DOM */

var React = require('react');
var Bootstrap = require('react-bootstrap');
var Table = Bootstrap.Table;
var Label = Bootstrap.Label;
var MemberStore = require('../../stores/Member');
var MemberActions = require('../../actions/Member');

var EditModal = require('./Member-EditModal');

var Item = React.createClass({
	editModal: function() {
		MemberActions.Open(this.props.member);
	},
	render: function() {
		var styles = {
			cursor: 'pointer'
		};

		var gender;
		if (this.props.member.gender == 0)
			gender = <Label bsStyle='primary'>male</Label>;
		else if (this.props.member.gender == 1)
			gender = <Label bsStyle='danger'>female</Label>;
		else
			gender = <Label bsStyle='default'>unknown</Label>;

		return (
			<tr href='#' style={styles} onClick={this.editModal}>
				<td>{this.props.serialno}</td>
				<td>{this.props.member.name}</td>
				<td>{gender}</td>
				<td>{this.props.member.birthday ? this.props.member.birthday.substring(0, 10) : ''}</td>
				<td>{this.props.member.email}</td>
				<td>{this.props.member.phone}</td>
				<td>{this.props.member.cardno}</td>
				<td>{this.props.member.created}</td>
			</tr>
		);
	}
});

var ListView = React.createClass({
	getInitialState: function() {
		return {
			members: {}
		};
	},
	getDefaultProps: function() {
		return {
			page: 1,
			perPage: 100
		};
	},
	componentDidMount: function() {
/*
		$.get('/members?page=' + this.state.page + '&perpage=' + this.state.perPage, function(results) {
			if (this.isMounted()) {
				var members = {};

				for (var index in results.members) {
					var member = results.members[index];
					members[member._id] = member;
				}

				this.setState({
					pageCount: results.pageCount,
					page: results.page,
					perPage: perPage,
					members: members
				});
			}
		}.bind(this));
*/
		MemberStore.on('Refresh', this._refresh);
		MemberStore.on('MembersUpdated', this._update);

		// Fetching member list 
		MemberActions.Fetch(this.props.page, this.props.perPage);
	},
	componentWillUnmount: function() {
		MemberStore.removeListener('MembersUpdated', this._update);
		MemberStore.removeListener('Refresh', this._refresh);
	},
	componentWillReceiveProps: function(nextProps) {

		MemberActions.Fetch(nextProps.page, nextProps.perPage);
	},
	render: function() {
		var rows = [];

		var serialno = 1;
		for (var id in this.state.members) {
			var member = this.state.members[id];
			rows.push(<Item serialno={serialno} member={member}/>);
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
							<th>Gender</th>
							<th>Birthday</th>
							<th>Email</th>
							<th>Phone</th>
							<th>Card Number</th>
							<th>Created</th>
						</tr>
					</thead>
					<tbody>{rows}</tbody>
				</Table>
			</div>
		);
	},
	_update: function(members) {
		for (var index in members) {
			var member = members[index];

			this.state.members[member._id] = member;
		}

		this.forceUpdate();
	},
	_refresh: function(info, members) {

		if (this.isMounted()) {
			this.setState({
				members: members
			});
		}
	},
	_change: function() {

		$.get('/members', function(results) {
			if (this.isMounted()) {
				this.setState({
					members: results
				});
			}
		}.bind(this));
	}
});

module.exports = ListView;
