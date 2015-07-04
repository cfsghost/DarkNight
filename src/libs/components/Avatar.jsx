/** @jsx React.DOM */

var React = require('react');
var crypto = require('crypto');

var sizes = [
	16,
	32,
	64,
	96,
	128,
	256
];
function nearestSize(size) {
	for (var index in sizes) {
		if (size < sizes[index])
			return sizes[index];
	}

	return sizes[sizes.length - 1];
}

var Avatar = React.createClass({
	getDefaultProps: function() {
		return {
			email: '',
			size: 200
		}
	},
	render: function() {
		var hash = crypto.createHash('md5').update(this.props.email).digest('hex');

		if (this.props.size == -1) {
			var style = {
				width: '100%'
			};

			return (
				<img
					src={'https://secure.gravatar.com/avatar/' + hash + '?s=' + 256 + '&d=mm'}
					style={style}
					className='img-circle' />
			);
		}

		var requestSize = nearestSize(this.props.size);

		return (
			<img
				src={'https://secure.gravatar.com/avatar/' + hash + '?s=' + requestSize  + '&d=mm'}
				width={this.props.size}
				height={this.props.size}
				className='img-circle' />
		);
	}
});

module.exports = Avatar;
