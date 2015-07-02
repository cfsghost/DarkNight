/** @jsx React.DOM */

var React = require('react');
var Bootstrap = require('react-bootstrap');
var Grid = Bootstrap.Grid;
var Row = Bootstrap.Row;
var Col = Bootstrap.Col;
var Thumbnail = Bootstrap.Thumbnail;
var Avatar = require('./Avatar');

var HomeMain = React.createClass({
	render: function() {
		var VideoStyle = {
			width: window.innerWidth,
			height: window.innerHeight - 50
		};
		return (
			<Grid ClassName='container-fuild'>
			    <Row>
			      <Col xs={12} md={12}>
					<Avatar email='cfsghost@gmail.com' />
			      </Col>
			    </Row>
			</Grid>
		);
	}
});

module.exports = HomeMain;
