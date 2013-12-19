var express = require('express');

module.exports = function(app) {
	app.use('/', express.static(__dirname + '/dist'));
};