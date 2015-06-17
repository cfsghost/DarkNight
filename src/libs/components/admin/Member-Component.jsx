/** @jsx React.DOM */

var React = require('react');
var Router = require('react-router');
var Bootstrap = require('react-bootstrap');
var Modal = Bootstrap.Modal;
var Panel = Bootstrap.Panel;
var Col = Bootstrap.Col;
var Row = Bootstrap.Row;
var Glyphicon = Bootstrap.Glyphicon;
var ButtonToolbar = Bootstrap.ButtonToolbar;
var Button = Bootstrap.Button;
var DropdownButton = Bootstrap.DropdownButton;
var MenuItem = Bootstrap.MenuItem;
var Input = Bootstrap.Input;
var Navbar = Bootstrap.Navbar;
var Nav = Bootstrap.Nav;
var NavItem = Bootstrap.NavItem;
var MemberStore = require('../../stores/Member');
var MemberActions = require('../../actions/Member');

var NewModal = require('./Member-NewModal');
var ListView = require('./Member-ListView');

var Toolbar = React.createClass({
	mixins: [ Router.State, Router.Navigation ],
	getInitialState: function() {
		return {
			field: 'name',
			keywords: ''
		};
	},
	componentDidMount: function() {

		var queries = this.props.queries || {};
		var searchTxt = '';
		var field = this.state.field;
		if (Object.keys(queries).length > 0) {
			field = Object.keys(queries)[0];
			searchTxt = queries[field];
		}

		this.setState({
			field: field,
			keywords: searchTxt
		});
	},
	newModal: function() {
		MemberActions.New();
	},
	changeFilter: function() {
		var filter = this.refs.filter.getValue();

		// Update property
		var queries = {};
		queries[filter] = this.refs.searchTxt.getValue();
		this.props.queries = queries;

		this.setState({
			field: this.refs.filter.getValue()
		});
	},
	search: function() {

		var filter = this.refs.filter.getValue() || 'name';
		var text = this.refs.searchTxt.getValue() || null;

		var query = this.getQuery();
		delete query.page;
		delete query.perPage;
		if (!text) {
			delete query.queries;
		} else {
			var queries = {}
			queries[filter] = this.refs.searchTxt.getValue();
			query.queries = JSON.stringify(queries);
		}

		// Change router
		this.replaceWith(this.getPathname(), this.getParams(), query);
	},
	handleKeyUp: function(e) {

		// Enter
		if (e.which == 13) {
			this.search();
		}
	},
	handleSearchTxtChange: function() {
		this.setState({
			keywords: this.refs.searchTxt.getValue()
		});
	},
	componentWillReceiveProps: function(nextProps) {
		var queries = nextProps.queries || {};
		var searchTxt = '';
		var field = 'name';
		if (Object.keys(queries).length > 0) {
			field = Object.keys(queries)[0];
			searchTxt = queries[field];
		}

		this.setState({
			field: field,
			keywords: searchTxt
		});
	},
	render: function() {

		var searchButton = <Button onClick={this.search}><Glyphicon glyph='search' /></Button>;

		return (
			<Panel>
				<ButtonToolbar>
					<Col md={8}>
						<Button onClick={this.newModal}><Glyphicon glyph='plus' /> Add</Button>
					</Col>
					<Col md={4}>
						<Col md={4}>
							<Input type='select' value={this.state.field} ref='filter' onChange={this.changeFilter}>
								<option value='name'>Name</option>
								<option value='email'>E-mail</option>
								<option value='phone'>Phone</option>
								<option value='cardno'>Card No</option>
								<option value='idno'>ID No</option>
								<option value='token'>Token</option>
							</Input>
						</Col>
						<Col md={8}>
							<Input type='text' ref='searchTxt' placeholder='Search...' value={this.state.keywords} buttonAfter={searchButton} onChange={this.handleSearchTxtChange} onKeyUp={this.handleKeyUp}/>
						</Col>
					</Col>
				</ButtonToolbar>
			</Panel>
		);
	}
});

var Pagination = React.createClass({
	mixins: [ Router.State, Router.Navigation ],
	getInitialState: function() {
		return {
			page: 1,
			pageCount: 1,
			perPage: 100
		};
	},
	componentDidMount: function() {
		MemberStore.on('InfoUpdated', this._update);

		MemberActions.GetInfo();
	},
	componentWillUnmount: function() {
		MemberStore.removeListener('InfoUpdated', this._update);
	},
	render: function() {
		var pageItems = [];

		// Figure out range
		var start = 1;
		var end = this.state.pageCount;
		if (this.state.page < 6) {
			start = 1;
			end = start + 9;
			if (end > this.state.pageCount) {
				end = this.state.pageCount;
			}
		} else if (this.state.page > this.state.pageCount - 4) {
			start = this.state.pageCount - 9;
			end = this.state.pageCount;
		} else {
			start = this.state.page - 5;
			end = this.state.page + 4;
		}

		var next = this.state.page + 10;
		if (next > this.state.pageCount)
			next = this.state.pageCount;

		var prev = this.state.page - 10;
		if (prev < 1) {
			prev = 1;
		}

		// Page list
		for (var i = start; i <= end; i++) {
			var query = this.getQuery();
			query.page = i;
			query.perPage = this.state.perPage;

			if (i == this.state.page) {
				pageItems.push(<li className='active'><a href={this.makeHref(this.getPathname(), this.getParams(), query)}>{i}<span class='sr-only'></span></a></li>);
			} else {
				pageItems.push(<li><a href={this.makeHref(this.getPathname(), this.getParams(), query)}>{i}</a></li>);
			}
		}

		var query = this.getQuery();
		query.perPage = this.state.perPage;

		// Previous 10 page
		query.page = prev;
		var prevHref = this.makeHref(this.getPathname(), this.getParams(), query);

		// Next 10 page
		query.page = next;
		var nextHref = this.makeHref(this.getPathname(), this.getParams(), query);

		return (
			<nav>
				<ul className='pagination'>
					<li>
						<a href={prevHref} aria-label='Previous'>
							<span aria-hidden='true'>&laquo;</span>
						</a>
					</li>
					{pageItems}
					<li>
						<a href={nextHref} aria-label='Next'>
							<span aria-hidden='true'>&raquo;</span>
						</a>
					</li>
				</ul>
			</nav>
		);
	},
	_update: function(info) {

		if (this.isMounted()) {
			this.setState({
				pageCount: info.pageCount,
				page: info.page,
				perPage: info.perPage
			});
		}
	},
});

var Member = React.createClass({
	mixins: [ Router.State, Router.Navigation ],
	/*
	contextTypes: {
		router: React.PropTypes.func
	},
	*/
	getInitialState: function() {
		return {
			//isOpen: false
			isOpen: true
		};
	},
	componentDidMount: function() {
		MemberStore.on('OpenManagement', this._openManagement);
		MemberStore.on('CloseManagement', this._closeManagement);
	},
	componentWillUnmount: function() {
		MemberStore.removeListener('OpenManagement', this._openManagement);
		MemberStore.removeListener('CloseManagement', this._closeManagement);
	},
	render: function() {
		if (!this.state.isOpen)
			return (<span />);

		var page = this.getQuery().page || 1;
		var perPage = this.getQuery().perPage || 100;
		var queries = this.getQuery().queries;
		if (queries)
			queries = JSON.parse(queries);
		else
			queries = {};
		
		return (
			<div>
				<NewModal />
				<div className='text-center'>
					<Toolbar queries={queries} />
					<Pagination />
				</div>
				<ListView page={page} perPage={perPage} queries={queries} />
			</div>
		);
	},
	_openManagement: function() {
		this.setState({
			isOpen: true 
		});
	},
	_closeManagement: function() {
		this.setState({
			isOpen: false 
		});
	}
});

module.exports = Member;
