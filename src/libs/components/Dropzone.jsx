/** @jsx React.DOM */

var Dropzone = require('dropzone');
 
var ReactDropzone = React.createClass({
	componentDidMount: function() {
		var options = {};

		for (var opt in Dropzone.prototype.defaultOptions) {
			var prop = this.props[opt];
			if (prop) {
				options[opt] = prop;
				continue;
			}

			options[opt] = Dropzone.prototype.defaultOptions[opt];
		}
		this.dropzone = new Dropzone(this.getDOMNode(), options);
	},
	componentWillUnmount: function() {
		this.dropzone.destroy();
		this.dropzone = null;
	},
	render: function() {
		var children = this.props.children;

		return this.transferPropsTo(
			<form>
				{children ? <div className="fallback">{children}</div> : null}
			</form>
		);
	}
});

module.exports = ReactDropzone;
