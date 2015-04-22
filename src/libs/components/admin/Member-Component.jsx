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
				<Button onClick={this.newModal}><Glyphicon glyph='plus' /> Add</Button>
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

		for (var i = this.state.page; i <= this.state.pageCount; i++) {
			if (i == this.state.page)
				pageItems.push(<li className='active'><a href='#'>{i}</a></li>);
			else
				pageItems.push(<li><a href='#'>{i}</a></li>);
		}

		return (
			<nav>
				<ul className='pagination'>
					<li className='disabled'>
						<a href='#' aria-label='Previous'>
							<span aria-hidden='true'>&laquo;</span>
						</a>
					</li>
					{pageItems}
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

		return (
			<div>
				<NewModal />
				<Toolbar />
				<Pagination />
				<ListView />
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
