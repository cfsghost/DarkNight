/** @jsx React.DOM */

var AwardStore = require('../../stores/Award');
var AwardActions = require('../../actions/Award');

module.exports = {
	Component: require('./Award-Component'),
	NewModal: require('./Award-NewModal'),
	ListView: require('./Award-ListView')
};
