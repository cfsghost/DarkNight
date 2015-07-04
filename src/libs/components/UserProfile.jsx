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
		return (
			<Grid ClassName='container-fuild'>
				<Row>
					<Col xs={12} mdOffset={5} md={2} className='text-center'>
						<Avatar email='cfsghost@gmail.com' size={-1} />
						<span>Fred Chien</span>
						<span>004</span>
					</Col>
				</Row>
			</Grid>
		);
	}
});

module.exports = HomeMain;
