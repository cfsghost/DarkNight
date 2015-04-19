/** @jsx React.DOM */

var React = require('react');

// Router
var ReactRouter = require('react-router');
var Route = ReactRouter.Route;
var DefaultRoute = ReactRouter.DefaultRoute;
var Redirect = ReactRouter.Redirect;
var NotFoundRoute = ReactRouter.NotFoundRoute;

// Components
var AdminApp = require('../libs/components/AdminApp.jsx');
var Endpoint = require('../libs/components/admin/Endpoint.jsx');
var EndpointComponent = Endpoint.Component;
var Member = require('../libs/components/admin/Member.jsx');
var MemberComponent = Member.Component;

var routes = (
	<Route name='app' path='/' handler={AdminApp}>
		<Route path='/endpoints' name='endpoints' handler={EndpointComponent}>
			<Route name='endpoint' path='/endpoint/:endpointId' />
		</Route>
		<Route path='/members' name='members' handler={MemberComponent} />
		<Redirect to='endpoints' />
	</Route>
);

ReactRouter.run(routes, function(Handler) {
	React.render(
		<Handler />,
		document.getElementById('App')
	);
});
