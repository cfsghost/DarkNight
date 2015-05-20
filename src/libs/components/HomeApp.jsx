/** @jsx React.DOM */

var React = require('react');
var Header = require('./Header.jsx');
var HomeMain = require('./HomeMain.jsx');

var HomeApp = React.createClass({
	render: function() {
		return (
			<div>
				<Header />
				<HomeMain />
			</div>
		);
	}
});

module.exports = HomeApp;