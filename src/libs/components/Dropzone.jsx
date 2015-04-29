/** @jsx React.DOM */

var React = require('react');
var Bootstrap = require('react-bootstrap');
var Table = Bootstrap.Table;
var Panel = Bootstrap.Panel;
var Col = Bootstrap.Col;
var Grid = Bootstrap.Grid;
var Dropzone = require('dropzone');

var PreviewTemplate = React.createClass({
	render: function() {

		return (
			<div>
				<Col xs={6} md={4}>

					<img data-dz-thumbnail />
					<div className='progress progress-striped active' role='progressbar' aria-valuemin='0' aria-valuemax='100' aria-valuenow='0'>
						<div className='progress-bar progress-bar-success' style={{ width: '0%'}} data-dz-uploadprogress></div>
					</div>
				</Col>
			</div>
		);
/*
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
							<p className='size' data-dz-size></p>
							<div className='progress progress-striped active' role='progressbar' aria-valuemin='0' aria-valuemax='100' aria-valuenow='0'>
								<div className='progress-bar progress-bar-success' style={{ width: '0%'}} data-dz-uploadprogress></div>
							</div>
						</td>
					</tr>
				</tbody>
			</Table>
		);
*/
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
			url: '/uploads/award',
			previewTemplate: '',
			previewsContainer: null,
			maxFiles: 1
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

		var dropzone = this.dropzone = new Dropzone(React.findDOMNode(this), this.props);

		this.dropzone.on('addedfile', function(file) {
			if (this.props.onSending)
				this.props.onSending();
		}.bind(this));

		this.dropzone.on('complete', function(file) {
			file.previewElement.querySelector('.progress').style.display = 'none';

			if (this.props.onCompleted)
				this.props.onCompleted();
		}.bind(this));

		this.dropzone.on('success', function(file, response) {
			if (this.props.onSuccess)
				this.props.onSuccess(response);
		}.bind(this));

		this.dropzone.on('maxfilesexceeded', function(file) {
			dropzone.removeFile(file);
		});
	},
	componentWillUnmount: function() {
		this.dropzone.destroy();
		this.dropzone = null;
	},
	render: function() {
		var children = this.props.children;

		return (
			<Grid style={this.props.style}>
				<span style={{display: 'none'}}>
					<PreviewTemplate ref='previewTemplate' />
				</span>
			</Grid>
		);
	}
});

module.exports = ReactDropzone;
