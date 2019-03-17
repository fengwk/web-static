const path = require('path');
const config = require('./webpack.config.js');

config.entry = {
	'user-access': path.resolve(__dirname, '../src/support-system/index.js')
};

module.exports = config;
