var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var colors = require('colors');

var AnthraciteGenerator = module.exports = function AnthraciteGenerator(args, options, config) {
	yeoman.generators.Base.apply(this, arguments);

	this.indexFile = this.readFileAsString(path.join(this.sourceRoot(), 'app/index.html'));

	this.on('end', function () {
		this.installDependencies({
			skipInstall: options['skip-install']
		});
	});

	this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(AnthraciteGenerator, yeoman.generators.Base);

AnthraciteGenerator.prototype.welcome = function welcome() {
	// welcome message
	var logo =
		'\n Generator Anthracte v' + this.pkg.version +
		'\n              ..............' +
		'\n           ....................' +
		'\n       ..........................`' +
		'\n     ...............' + ';;;;;;;;:'.green + '......' +
		'\n    .............' + ':;;;;;;;;;;;;;'.green + '.....' +
		'\n    ............' + ',;;;;:'.green + '.....' + ':;;,'.green + '.....' +
		'\n    `...........' + ';;;;'.green + '.........,......`' +
		'\n    `..........' + ';;;'.green + '...................' +
		'\n    ..........' + ',;;;'.green + '......' + ':;;;;;;;;'.green + '....' +
		'\n    ..........' + ',;;;'.green + '......' + ':;;;;;;;;'.green + '....' +
		'\n     ..........' + ';;;'.green + '...........' + ':;;;'.green + '....' +
		'\n    ............' + ';;;;'.green + '.........' + ';;;;'.green + '...' +
		'\n   .............' + ',;;;;:'.green + '.....' + ':;;;;'.green + '....' +
		'\n  ................' + ',;;;;;;;;;;;'.green + '....`' +
		'\n ..................' + '.;;;;;;;;:'.green + '.....' +
		'\n `......................,........' +
		'\n    ............................' +
		'\n    `...........................' +
		'\n       ...........................' +
		'\n        ..........................`' +
		'\n         `...........................' +
		'\n               `.....................`' +
		'\n                 www.geekingreen.com'.green;

	var status =
		'\n' +
		'\nAnthracite will generate an app with the default name: "' +
		this._.classify(this.appname) + '"\nin the folder:' +
		' "' + this.env.cwd + '"\n';

	console.log(logo, status);
};

AnthraciteGenerator.prototype.askForAppName = function askForAppName() {
	var cb = this.async();

	var prompts = [{
		name: 'appName',
		message: 'If you would like to rename the app enter the name here, otherwise press enter:'
	}];

	this.prompt(prompts, function (answers) {
		if (answers.appName.trim().length) {
			this.appname = answers.appName;
		}

		cb();
	}.bind(this));
};

AnthraciteGenerator.prototype.askForUI = function askForUI() {
	var cb = this.async();

	var prompts = [{
		type: 'list',
		name: 'ui',
		message: 'Would you like to use any UI frameworks?',
		choices: [{
			name: 'Twitter Bootstrap',
			value: 2
		}, {
			name: 'Zurb Foundation',
			value: 1
		}, {
			name: 'None',
			value: 0
		}]
	}];

	this.prompt(prompts, function (answers) {
		this.twitterBootstrap = (answers.ui === 2);
		this.zurbFoundation = (answers.ui === 1);

		cb();
	}.bind(this));
};

AnthraciteGenerator.prototype.askForEmpty = function askForEmpty() {
	var cb = this.async();

	var prompts = [{
		name: 'empty',
		message: 'Would you like an example application? [y/n]'
	}];

	this.prompt(prompts, function (answers) {
		this.empty = answers.empty.match(/n/i);

		cb();
	}.bind(this));
};

AnthraciteGenerator.prototype.askForServer = function askForServer() {
	var cb = this.async();

	var prompts = [{
		name: 'serverExample',
		message: 'Would you like an example server? [y/n]'
	}];

	this.prompt(prompts, function (answers) {
		this.serverExample = answers.serverExample.match(/y/i);

		cb();
	}.bind(this));
};

AnthraciteGenerator.prototype.writeIndex = function writeIndex() {
	var cssFiles = [];
	var jsFiles = [
		'bower_components/jquery/jquery.js',
		'bower_components/handlebars/handlebars.runtime.js',
		'bower_components/ember-shim/ember.js',
		'bower_components/ember-data/ember-data.js'
	];

	if (this.zurbFoundation) {
		cssFiles.push('assets/css/foundation.css');
		jsFiles.push('bower_components/foundation/js/foundation/foundation.js');
		jsFiles.push('bower_components/foundation/js/foundation/foundation.topbar.js');
		jsFiles.push('bower_components/foundation/js/foundation/foundation.reveal.js');
	}
	if (this.twitterBootstrap) {
		cssFiles.push('assets/css/bootstrap.css');
		jsFiles.push('bower_components/bootstrap/dist/js/bootstrap.js');
	}

	cssFiles.push('assets/css/main.css');

	this.indexFile = this.appendFiles({
		html: this.indexFile,
		fileType: 'css',
		optimizedPath: 'assets/css/main.css',
		sourceFileList: cssFiles,
		searchPath: 'tmp'
	});

	this.indexFile = this.appendFiles({
		html: this.indexFile,
		fileType: 'js',
		optimizedPath: 'scripts/components.js',
		sourceFileList: jsFiles,
		searchPath: '.'
	});

	this.indexFile = this.appendFiles({
		html: this.indexFile,
		fileType: 'js',
		optimizedPath: 'scripts/main.js',
		sourceFileList: [
			'compiled-templates.js',
			'application.js'
		],
		searchPath: 'tmp'
	});
};

AnthraciteGenerator.prototype.app = function app() {
	this.write('app/index.html', this.indexFile);

	// Main application files
	this.template('index.js');
	this.template('app.js');
	this.template('app/application.js');
	this.directory('app/config');

	// Config and dependency files
	this.template('package.json');
	this.template('bower.json');

	this.template('Gruntfile.js');
	this.directory('grunt');

	this.copy('editorconfig', '.editorconfig');
	this.copy('jshintrc', '.jshintrc');

	// Unit/Integration test example files
	this.directory('test');

	this.template('README.md');

	// Base directories
	this.directory('app/components');
	this.directory('app/helpers');
	this.directory('app/initializers');
	this.directory('app/mixins');
	this.directory('app/partials');

	if (!this.empty) {
		this.directory('app/assets');
		this.directory('app/modules');
	}
	else {
		// Just create the directories if example is declined
		this.mkdir('app/assets/css');
		this.mkdir('app/assets/fonts');
		this.mkdir('app/assets/img');

		this.mkdir('app/modules/application/controllers');
		this.mkdir('app/modules/application/models');
		this.mkdir('app/modules/application/partials');
		this.mkdir('app/modules/application/routes');
		this.mkdir('app/modules/application/templates');
		this.mkdir('app/modules/application/views');
	}
};

AnthraciteGenerator.prototype.server = function server() {
	if (this.serverExample) {
		this.directory('server');
		this.template('server.js');
	}
};
