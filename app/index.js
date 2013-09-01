'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var AnthraciteGenerator = module.exports = function AnthraciteGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.indexFile = this.readFileAsString(path.join(this.sourceRoot(), 'index.html'));

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(AnthraciteGenerator, yeoman.generators.Base);

AnthraciteGenerator.prototype.welcome = function welcome() {
  // welcome message
  var logo =
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
    '\nAnthracite will generate an app with the name: "' +
    this._.classify(this.appname) + '"\nin the folder:' +
    ' "' + this.env.cwd + '"\n';

  console.log(logo, status);
};

AnthraciteGenerator.prototype.proceed = function proceed() {
  var cb = this.async();

  var prompts = [
    {
      name: 'generate',
      message: 'Would you like to continue? [y/n]'
    }
  ];

  this.prompt(prompts, function (err, props) {
    if (err) {
      return this.emit('error', err);
    }

    this.generate = props.generate.match(/y/i);

    if (this.generate) { cb(); }

  }.bind(this));
};

AnthraciteGenerator.prototype.askForMongo = function askForMongo() {
  var cb = this.async();

  var prompts = [
    {
      name: 'mongodb',
      message: 'Would you like to use mongodb as your backend? [y/n]'
    }
  ];

  this.prompt(prompts, function (err, props) {
    if (err) {
      return this.emit('error', err);
    }

    this.mongodb = props.mongodb.match(/y/i);

    cb();

  }.bind(this));
};

AnthraciteGenerator.prototype.askForSQL = function askForSQL() {
  if (!this.mongodb) {
    var cb = this.async();

    var prompts = [
      {
        name: 'nodeorm',
        message: 'Would you like to use SQL (MySQL, PostgreSQL, Redshift, SQLite) as your backend? [y/n]'
      }
    ];

    this.prompt(prompts, function (err, props) {
      if (err) {
        return this.emit('error', err);
      }

      this.nodeorm = props.nodeorm.match(/y/i);

      cb();

    }.bind(this));
  }
};

AnthraciteGenerator.prototype.askForAddons = function askForAddons() {
  var cb = this.async();

  var prompts = [
    {
      name: 'epf',
      message: 'Would you like to use Ember Persistence Foundation instead of Ember Data?'
    },
    {
      name: 'zurbFoundation',
      message: 'Would you like to use Zurb\'s Foundation framework? [y/n]'
    }
  ];

  this.prompt(prompts, function (err, props) {
    if (err) {
      return this.emit('error', err);
    }

    this.zurbFoundation = props.zurbFoundation.match(/y/i);
    this.epf = props.epf.match(/y/i);

    cb();

  }.bind(this));
};

AnthraciteGenerator.prototype.askForBootstrap = function askForBootstrap() {
  if (!this.zurbFoundation) {
    var cb = this.async();

    var prompts = [
      {
        name: 'twbs',
        message: 'Would you like to use Twitter Bootstrap 3? [y/n]'
      }
    ];

    this.prompt(prompts, function (err, props) {
      if (err) {
        return this.emit('error', err);
      }

      this.twbs = props.twbs.match(/y/i);

      cb();
    }.bind(this));
  } else {
    this.twbs = false;
  }
};

AnthraciteGenerator.prototype.writeIndex = function writeIndex() {
  var cssFiles = ['bower_components/normalize-css/normalize.css'];
  var jsFiles = [
    'bower_components/jquery/jquery.js',
    'bower_components/handlebars/handlebars.runtime.js',
    'bower_components/ember-shim/ember.js',
    'bower_components/' + (this.epf ? 'epf-shim/epf.js' : 'ember-data/index.js')
  ];

  if (this.zurbFoundation) {
    cssFiles.push('assets/styles/bower_components/foundation/scss/foundation.css');
    jsFiles.push('bower_components/foundation/js/foundation/foundation.js');
  }
  if (this.twbs) {
    cssFiles.push('bower_components/bootstrap/dist/css/bootstrap.css');
    jsFiles.push('bower_components/bootstrap/dist/js/bootstrap.js');
  }

  // Put style.css last so that it will override others
  cssFiles.push('assets/styles/style.css');

  this.indexFile = this.appendFiles({
    html: this.indexFile,
    fileType: 'css',
    optimizedPath: 'assets/styles/main.css',
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

  this.indexFile = this.appendFiles(this.indexFile, 'js', 'scripts/main.js', [
    'app/app.js',
    'app/compiled-templates.js'
  ], null, ['tmp']);
};

AnthraciteGenerator.prototype.app = function app() {
  this.write('app/index.html', this.indexFile);

  // Copy app
  this.template('app/app.js');
  this.template('app/application.hbs');
  this.template('app/store.js');
  this.template('app/router.js');

  // Components
  this.template('app/components/todo-item.hbs');
  this.template('app/components/todo-item.js');

  // Global templates
  this.mkdir('app/partials');
  this.mkdir('app/templates');

  // Copy helpers
  this.template('app/helpers/wordCount.js');

  // Copy main module
  this.template('app/modules/main/controllers/application.js');
  this.template('app/modules/main/controllers/about.js');
  this.template('app/modules/main/models/site.js');
  this.template('app/modules/main/partials/link.hbs');
  this.template('app/modules/main/routes/application.js');
  this.template('app/modules/main/templates/index.hbs');
  this.template('app/modules/main/templates/about.hbs');
  this.template('app/modules/main/templates/contact.hbs');
  this.template('app/modules/main/views/index.js');

  // Copy todos module
  this.template('app/modules/todos/controllers/todos.js');
  this.template('app/modules/todos/controllers/index.js');
  this.template('app/modules/todos/models/todo.js');
  this.template('app/modules/todos/routes/todos.js');
  this.template('app/modules/todos/templates/index.hbs');
  this.template('app/modules/todos/templates/todos.hbs');
};

AnthraciteGenerator.prototype.server = function server() {
  if (this.mongodb) {
    this.template('server/models/message-mongo.js', 'server/models/message.js');
    this.template('server/mongoapi.js');
  }

  if (this.nodeorm) {
    this.template('server/models/message-orm.js', 'server/models/message.js');
    this.template('server/mysqlapi.js');
  }
};

AnthraciteGenerator.prototype.test = function test() {
  this.template('test/index.html');
  this.template('test/main.js');
  this.template('test/spec/index_spec.js');
};

AnthraciteGenerator.prototype.assets = function assets() {
  this.mkdir('assets');
  this.mkdir('assets/img');
  this.mkdir('assets/styles');
  this.mkdir('assets/styles/fonts');

  this.copy('assets/styles/style.css', 'assets/styles/style.css');
};

AnthraciteGenerator.prototype.gruntfile = function gruntfile() {
  this.template('Gruntfile.js');
  this.copy('anthracite/grunt.js', 'anthracite/grunt.js');
};

AnthraciteGenerator.prototype.projectfiles = function projectfiles() {
  this.template('README.md');
  this.template('package.json');
  this.template('bower.json');

  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
};
