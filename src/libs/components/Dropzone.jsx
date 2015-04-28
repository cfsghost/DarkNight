/** @jsx React.DOM */

var React = require('react');
var Bootstrap = require('react-bootstrap');
var Table = Bootstrap.Table;
var Panel = Bootstrap.Panel;
var Dropzone = require('dropzone');

var PreviewTemplate = React.createClass({
	render: function() {

		return (
			<Table responsive striped>
				<tbody>
					<tr className='file-row'>
						<td className='preview'><img data-dz-thumbnail /></td>
						<td className='name'>
							<p data-dz-name />
							<strong className='error text-danger' data-dz-errormessage></strong>
						</td>
						<td>
							<p className="size" data-dz-size></p>
							<div className="progress progress-striped active" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0">
								<div className="progress-bar progress-bar-success" style={{ width: '0%'}} data-dz-uploadprogress></div>
							</div>
						</td>
					</tr>
				</tbody>
			</Table>
		);
	}
});
/*
			<div className='table table-striped files' id='previews'>
				 
				<div id="template" className="file-row">
					<div>
						<span className="preview"><img data-dz-thumbnail /></span>
					</div>
					<div>
						<p className="name" data-dz-name></p>
					</div>
					<div>
						<p className="size" data-dz-size></p>
						<div className="progress progress-striped active" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0">
							<div className="progress-bar progress-bar-success" style={{ width: '0%'}} data-dz-uploadprogress></div>
						</div>
					</div>
					<div>
						<button className="btn btn-primary start">
							<i className="glyphicon glyphicon-upload"></i>
							<span>Start</span>
						</button>
						<button data-dz-remove className="btn btn-warning cancel">
							<i className="glyphicon glyphicon-ban-circle"></i>
							<span>Cancel</span>
						</button>
						<button data-dz-remove className="btn btn-danger delete">
							<i className="glyphicon glyphicon-trash"></i>
							<span>Delete</span>
						</button>
					</div>
				</div>
			</div> 
*/
var ReactDropzone = React.createClass({
	getDefaultProps: function() {
		return {
			url: '/uploads',
			previewTemplate: '',
			previewsContainer: null
		};
	},
	componentDidMount: function() {
		var options = {};

		for (var opt in Dropzone.prototype.defaultOptions) {
			var prop = this.props[opt];
			if (prop) {
				this.props[opt] = prop;
				continue;
			}

			this.props[opt] = Dropzone.prototype.defaultOptions[opt];
		}

		this.props.previewTemplate = this.refs.previewTemplate.getDOMNode().innerHTML;

		this.dropzone = new Dropzone(React.findDOMNode(this), this.props);
	},
	componentWillUnmount: function() {
		this.dropzone.destroy();
		this.dropzone = null;
	},
	render: function() {
		var children = this.props.children;
		return (
			<div style={this.props.style}>
				<span style={{display: 'none'}}>
					<PreviewTemplate ref='previewTemplate' />
				</span>
			</div>
		);
/*
		return (
			<Panel>
				<form className='dropzone'>
					{children ? <div className='fallback'>{children}</div> : null}
				</form>
			</Panel>
		);
*/
	}
});

module.exports = ReactDropzone;
