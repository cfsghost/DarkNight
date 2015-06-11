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

var Login = React.createClass({
	submit: function() {
		console.log(132123);
	},
	render: function() {
		return (
			<div>
				<Header />
				<Grid>
			    	<Col sm={6} smOffset={3}>
			      		<h1>Sign In</h1>

			      		<form action="/login" method="post">
			      			<div className="form-group">
			      				<Input type="text" label="Email or Username" name="email" autoFocus/>
			      			</div>
			      			<div className="form-group">
			      				<Input type="password" label="Password" name="password"/>
			      			</div>

			      			<Button type="submit" className="btn btn-primary">Sign In</Button>
			      		</form>

					    <p>Need an account? <a href="/signup/Local">Signup</a></p>
					    <p>Or go <a href="/">home</a>.</p>
			    	</Col>
				</Grid>
			</div>
		);
	}
});

module.exports = Login;
