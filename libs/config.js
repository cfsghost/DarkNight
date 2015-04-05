var path = require('path');
var settings = {};

try {
	settings.general = require(path.join(__dirname, '..', 'configs', 'general.json'));
} catch(e) {
	settings = null;
}

module.exports = settings;
