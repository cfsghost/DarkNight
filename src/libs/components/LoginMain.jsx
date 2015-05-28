/** @jsx React.DOM */

var React = require('react');
var Bootstrap = require('react-bootstrap');
var Grid = Bootstrap.Grid;
var Row = Bootstrap.Row;
var Col = Bootstrap.Col;
var Input = Bootstrap.Input;
var Label = Bootstrap.Label;
var Button = Bootstrap.Button;

var LoginMain = React.createClass({
	render: function() {
		return (
			<Grid>
		    	<Col sm={6} smOffset={3} >
		      		<h1><span class="fa fa-sign-in"></span> Login</h1>

		      		<form action="/login" method="post">
		      			<div className="form-group">
		      				<h3><Label bsStyle='info'>Email</Label></h3>
		      				<Input type="text" className="form-control" name="email"/>
		      			</div>
		      			<div className="form-group">
		      				<h3><Label bsStyle='info'>Password</Label></h3>
		      				<Input type="password" className="form-control" name="password"/>
		      			</div>

		      			<Button type="submit" class="btn btn-warning btn-lg">Login</Button>
		      		</form>

				    <p>Need an account? <a href="/signup">Signup</a></p>
				    <p>Or go <a href="/">home</a>.</p>
		    	</Col>
			</Grid>
		);
	}
});

module.exports = LoginMain;