/** @jsx React.DOM */

var React = require('react');
var Bootstrap = require('react-bootstrap');
var Modal = Bootstrap.Modal;
var Glyphicon = Bootstrap.Glyphicon;
var ButtonToolbar = Bootstrap.ButtonToolbar;
var Button = Bootstrap.Button;
var Input = Bootstrap.Input;
var Navbar = Bootstrap.Navbar;
var Nav = Bootstrap.Nav;
var NavItem = Bootstrap.NavItem;
var MemberStore = require('../../stores/Member');
var MemberActions = require('../../actions/Member');

var NewModal = require('./Member-NewModal');
var ListView = require('./Member-ListView');

var Toolbar = React.createClass({
	newModal: function() {
		MemberActions.New();
	},
	render: function() {
		return (
			<ButtonToolbar>
				<Button bsStyle='primary' onClick={this.newModal}><Glyphicon glyph='plus' /> Add</Button>
			</ButtonToolbar>
		);
	}
});

var Pagination = React.createClass({
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

		for (var i = start; i <= end; i++) {
			if (i == this.state.page)
				pageItems.push(<li className='active'><a href={'#/members?page=' + i + '&perPage=' + this.state.perPage}>{i}<span class='sr-only'></span></a></li>);
			else
				pageItems.push(<li><a href={'#/members?page=' + i + '&perPage=' + this.state.perPage}>{i}</a></li>);
		}

		return (
			<nav>
				<ul className='pagination'>
					<li>
						<a href={'#/members?page=' + prev + '&perPage=' + this.state.perPage} aria-label='Previous'>
							<span aria-hidden='true'>&laquo;</span>
						</a>
					</li>
					{pageItems}
					<li>
						<a href={'#/members?page=' + next + '&perPage=' + this.state.perPage} aria-label='Next'>
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
	contextTypes: {
		router: React.PropTypes.func
	},
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

		var page = this.context.router.getCurrentQuery().page || 1;
		var perPage = this.context.router.getCurrentQuery().perPage || 100;

		return (
			<div>
				<NewModal />
				<div className='text-center'>
					<Toolbar />
					<Pagination />
				</div>
				<ListView page={page} perPage={perPage} />
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
