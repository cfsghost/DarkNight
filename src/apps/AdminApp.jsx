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
var Award = require('../libs/components/admin/Award.jsx');
var AwardComponent = Award.Component;

var routes = (
	<Route name='app' path='/' handler={AdminApp}>
		<Route path='/endpoints' name='endpoints' handler={EndpointComponent}>
			<Route name='endpoint' path='/endpoint/:endpointId' />
		</Route>
		<Route path='/members' name='members' handler={MemberComponent} />
		<Route path='/members/:page/:perPage' name='members-page' handler={MemberComponent} />
		<Route path='/awards' name='awards' handler={AwardComponent} />
		<Redirect to='endpoints' />
	</Route>
);

ReactRouter.run(routes, function(Handler) {
	React.render(
		<Handler />,
		document.getElementById('App')
	);
});
