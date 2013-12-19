var path = require('path');

module.exports = {
	options: {
		paths: ['app/']
	},
	dev: {
		expand: true,
		cwd: 'app/',
		src: 'assets/css/**/*.less',
		dest: 'tmp/',
		ext: '.css'
	}
};
