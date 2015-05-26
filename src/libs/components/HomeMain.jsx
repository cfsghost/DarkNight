/** @jsx React.DOM */

var React = require('react');
var Bootstrap = require('react-bootstrap');
var Grid = Bootstrap.Grid;
var Row = Bootstrap.Row;
var Col = Bootstrap.Col;
var Thumbnail = Bootstrap.Thumbnail;

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
			      	<iframe width={VideoStyle.width} height={VideoStyle.height} src="https://www.youtube-nocookie.com/embed/Fs2tyGW1Gyo?rel=0&amp;controls=0&amp;showinfo=0;autoplay=1" frameborder="0" allowfullscreen></iframe>
			      </Col>
			    </Row>
			</Grid>
		);
	}
});

module.exports = HomeMain;