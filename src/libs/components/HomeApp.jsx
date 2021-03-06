/** @jsx React.DOM */

var React = require('react');
var Header = require('./Header.jsx');
var HomeMain = require('./HomeMain.jsx');
var UserProfile = require('./UserProfile.jsx');

var HomeApp = React.createClass({
	render: function() {
		var contentStyle = {
			'paddingTop': '50px'
		};

		return (
			<div>
				<Header />
				<div style={contentStyle}>
					<UserProfile />
				</div>
			</div>
		);
	}
});

module.exports = HomeApp;
