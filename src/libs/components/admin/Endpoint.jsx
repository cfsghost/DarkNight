/** @jsx React.DOM */

var EndpointStore = require('../../stores/Endpoint');
var EndpointActions = require('../../actions/Endpoint');

module.exports = {
	Component: require('./Endpoint-Component'),
	NewModal: require('./Endpoint-NewModal'),
	ListView: require('./Endpoint-ListView')
};
