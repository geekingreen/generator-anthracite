module.exports = {
	// Global options
	options: {
		livereload: true
	},

	index: {
		files: ['app/index.html'],
		tasks: ['copy:index']
	},

	css: {
		files: ['app/assets/**/*.css'],
		tasks: ['copy:css'],
		options: {
			livereload: false
		}
	},

	less: {
		files: ['app/assets/**/*.less'],
		tasks: ['less:dev'],
		options: {
			livereload: false
		}
	},

	compass: {
		files: ['app/assets/**/*.sass', 'app/assets/**/*.scss'],
		tasks: ['compass:dev'],
		options: {
			livereload: false
		}
	},

	// Livereload css files when they change in 'tmp/'
	tmpCss: {
		files: ['tmp/assets/**/*.css']
	},

	scripts: {
		files: ['app/**/*.js', 'bower_components/**/*.js'],
		tasks: ['neuter']
	},

	emberTemplates: {
		files: ['app/**/*.{hbs,handlebars}'],
		tasks: ['emberTemplates']
	}
};
