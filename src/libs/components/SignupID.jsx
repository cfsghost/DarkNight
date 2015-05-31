/** @jsx React.DOM */

var React = require('react');
var Header = require('./Header.jsx');
var Bootstrap = require('react-bootstrap');
var Grid = Bootstrap.Grid;
var Row = Bootstrap.Row;
var Col = Bootstrap.Col;
var Input = Bootstrap.Input;
var Label = Bootstrap.Label;
var Button = Bootstrap.Button;

var SignupID = React.createClass({
	render: function() {
		return (
			<div>
				<Header />
				<Grid>
			    	<Col sm={6} smOffset={3} >
			      		<h1><span class="fa fa-sign-in"></span> Sign Up</h1>

			      		<form action="/signup/ID" method="post">
			      			<div className="form-group">
			      				<h3><Label bsStyle='info'>Hackathon Card ID</Label></h3>
			      				<Input type="text" className="form-control" name="id"/>
			      			</div>
			      			<div className="form-group">
			      				<h3><Label bsStyle='info'>Password</Label></h3>
			      				<Input type="password" className="form-control" name="password"/>
			      			</div>

			      			<Button type="submit" class="btn btn-warning btn-lg">Sign Up</Button>
			      		</form>

					    <p>Already have an account? <a href="/login/ID">Login by Card ID</a></p>
    					<p>Or go <a href="/">home</a>.</p>
			    	</Col>
				</Grid>
			</div>
		);
	}
});

module.exports = SignupID;