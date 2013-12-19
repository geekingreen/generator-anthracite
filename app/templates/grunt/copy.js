module.exports = {
	// Copy bootstrap fonts
	bootstrap: {
		files: [{
			expand: true,
			cwd: 'bower_components/bootstrap/dist/',
			src: ['fonts/**'],
			dest: 'tmp/assets/'
		}]
	},

	css: {
		files: [{
			expand: true,
			cwd: 'app/',
			src: ['assets/css/**/*.css'],
			dest: 'tmp/'
		}]
	},

	dev: {
		files: [{
			expand: true,
			cwd: 'app/',
			src: ['**/*'],
			dest: 'tmp/'
		}, {
			expand: true,
			cwd: './',
			src: ['bower_components/**'],
			dest: 'tmp/'
		}]
	},

	dist: {
		files: [{
			expand: true,
			cwd: 'tmp/',
			src: ['index.html', 'assets/fonts/**', 'assets/img/**'],
			dest: 'dist/'
		}]
	},

	index: {
		files: {
			'tmp/index.html': 'app/index.html'
		}
	}
};
