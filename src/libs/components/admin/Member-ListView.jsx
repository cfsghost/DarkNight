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
		else
			gender = <Label bsStyle='danger'>female</Label>;

		return (
			<tr href='#' style={styles} onClick={this.editModal}>
				<td>{this.props.serialno}</td>
				<td>{this.props.member._id}</td>
				<td>{this.props.member.name}</td>
				<td>{gender}</td>
				<td>{this.props.member.email}</td>
				<td>{this.props.member.cardno}</td>
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
	componentDidMount: function() {
		$.get('/members', function(results) {
			if (this.isMounted()) {
				var members = {};

				for (var index in results) {
					var member = results[index];
					members[member._id] = member;
				}

				this.setState({
					members: members
				});
			}
		}.bind(this));

		MemberStore.on('MembersUpdated', this._update);
	},
	componentWillUnmount: function() {
		MemberStore.removeListener('MembersUpdated', this._update);
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
				<Table responsive striped>
					<thead>
						<tr>
							<th>#</th>
							<th>ID</th>
							<th>Name</th>
							<th>Gender</th>
							<th>Email</th>
							<th>Card Number</th>
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

module.exports = React.createFactory(ListView);
