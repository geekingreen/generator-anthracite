'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');

var ModuleGenerator = module.exports = function ModuleGenerator(args, options, config) {
  yeoman.generators.NamedBase.apply(this, arguments);

  if (!this.name) {
    this.log.error("Usage: yo anthracite:module <module name>");
    process.exit(1);
  }

  this.on('end', function () {
    this.log.ok('Created new module with name ' + this._.classify(this.name) + '.');
  });
};

util.inherits(ModuleGenerator, yeoman.generators.NamedBase);

ModuleGenerator.prototype.askForAppName = function askForAppName() {
	var cb = this.async();

	var prompts = [{
		name: 'appName',
		message: 'What is the root namespace of your application:'
	}];

	this.prompt(prompts, function (answers) {
		if (answers.appName.trim().length) {
			this.appname = answers.appName;
		}

		cb();
	}.bind(this));
};

ModuleGenerator.prototype.module = function module() {
  var directory = "app/modules/" + this.name.toLowerCase() + "/",
    underscored = this._.underscored(this.name);

  this.template('routes/index.js', directory + 'routes/index.js');
  this.template('controllers/index.js', directory + 'controllers/index.js');
  this.template('views/index.js', directory + 'views/index.js');
  this.template('models/model.js', directory + 'models/' + underscored + '.js');
  this.template('templates/index.hbs', directory + 'templates/index.hbs');
};
