/** @jsx React.DOM */

var React = require('react');
var Bootstrap = require('react-bootstrap');
var Table = Bootstrap.Table;
var EndpointStore = require('../../stores/Endpoint');
var EndpointActions = require('../../actions/Endpoint');

var EditModal = require('./Endpoint-EditModal');

var Item = React.createClass({
	editModal: function() {
		EndpointActions.Open(this.props.endpoint);
	},
	render: function() {
		var styles = {
			cursor: 'pointer'
		};

		return (
			<tr href='#' style={styles} onClick={this.editModal}>
				<td>{this.props.serialno}</td>
				<td>{this.props.endpoint._id}</td>
				<td>{this.props.endpoint.name}</td>
			</tr>
		);
	}
});

var ListView = React.createClass({
	getInitialState: function() {
		return {
			endpoints: {}
		};
	},
	componentDidMount: function() {
		$.get('/endpoints', function(results) {
			if (this.isMounted()) {
				var endpoints = {};

				for (var index in results) {
					var endpoint = results[index];
					endpoints[endpoint._id] = endpoint;
				}

				this.setState({
					endpoints: endpoints
				});
			}
		}.bind(this));

		EndpointStore.on('EndpointsUpdated', this._update);
	},
	componentWillUnmount: function() {
		EndpointStore.removeListener('EndpointsUpdated', this._update);
	},
	render: function() {
		var rows = [];

		var serialno = 1;
		for (var id in this.state.endpoints) {
			var endpoint = this.state.endpoints[id];
			rows.push(<Item serialno={serialno} endpoint={endpoint}/>);
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
						</tr>
					</thead>
					<tbody>{rows}</tbody>
				</Table>
			</div>
		);
	},
	_update: function(endpoints) {
		for (var index in endpoints) {
			var endpoint = endpoints[index];

			this.state.endpoints[endpoint._id] = endpoint;
		}

		this.forceUpdate();
	},
	_change: function() {

		$.get('/endpoints', function(results) {
			if (this.isMounted()) {
				this.setState({
					endpoints: results
				});
			}
		}.bind(this));
	}
});

module.exports = ListView;
