/*
 * This file defines a bunch of premade tasks for you to use.
 * If you'd like to add your own tasks, you should add them to the `config`
 * object in your `Gruntfile.js` instead of here.
 * */

var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;
var mountFolder = function (connect, dir) {
  return connect.static(require('path').resolve(dir));
};
var template = require('grunt').template;

module.exports = {
  config: {

    // Watch tasks
    // ------------------
    watch: {
      emberTemplates: {
        files: [
          'app/**/*.hbs',
          'app/**/*.handlebars'
        ],
        spawn: true,
        tasks: ['emberTemplates']
      },

      less: {
        files: ['assets/styles/**/*.less'],
        tasks: ['less:dev']
      },

      assets: {
        files: [
          'assets/styles/**/*.css'
        ],
        tasks: ['copy:dev']
      },

      livereload: {
        files: [
          'tmp/*.html',
          'tmp/assets/{,*/}*.css',
          'tmp/{,*/}*.js',
          'tmp/assets/img/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ],
        tasks: ['livereload']
      },
      neuter: {
        files: [
          'app/**/*.js'
        ],
        tasks: ['neuter', 'copy:dev']
      }
    },

    // Server tasks
    // ------------------
    connect: {
      options: {
        port: 9000,
        // change this to '0.0.0.0' to access the server from outside
        hostname: 'localhost'
      },
      livereload: {
        options: {
          middleware: function (connect) {
            return [
              lrSnippet,
              mountFolder(connect, 'tmp')
            ];
          }
        }
      },
      test: {
        options: {
          middleware: function (connect) {
            return [
              mountFolder(connect, 'tmp')
            ];
          }
        }
      },
      dist: {
        options: {
          middleware: function (connect) {
            return [
              mountFolder(connect, 'dist')
            ];
          }
        }
      }
    },

    // Opens your web browser when you start a server
    // ------------------
    open: {
      server: {
        path: 'http://localhost:<%%= connect.options.port %>'
      }
    },

    // Dist
    // ------------------
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            'tmp',
            'dist/*',
            '!dist/.git*'
          ]
        }]
      },
      server: 'tmp'
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        'app/**/*.js',
        'test/**/*.js'
      ]
    },

    // Testing
    // ------------------
    qunit: {
      all: {
        options: {
          urls: ['http://localhost:<%%= connect.options.port %>/index.html']
        }
      }
    },

    // Asset building
    // ------------------
    less: {
      dev: {
        files: [{
          expand: true,
          cwd: "assets/styles",
          src: ["**/*.less"],
          dest: "tmp/assets/styles",
          ext: ".css"
        }]
      },
      dist: {
        files: [{
          expand: true,
          cwd: "assets/styles",
          src: ["**/*.less"],
          dest: "tmp/assets/styles",
          ext: ".css"
        }],
        options: {
          yuicompress: true
        }
      }
    },

    sass: {
      dev: {
        files: [{
          expand: true,
          cwd: ".",
          src: ["assets/styles/**/*.scss", "assets/styles/**/*.sass"<% if (zurbFoundation) { %>, "bower_components/foundation/scss/foundation.scss"<% } %>],
          dest: "tmp/assets/styles",
          ext: ".css"
        }]
      },
      dist: {
        files: [{
          expand: true,
          cwd: ".",
          src: ["assets/styles/**/*.scss", "assets/styles/**/*.sass"<% if (zurbFoundation) { %>, "bower_components/foundation/scss/foundation.scss"<% } %>],
          dest: "tmp/assets/styles",
          ext: ".css"
        }],
        options: {
          style: "compress"
        }
      }
    },

    // Revisioning
    // ------------------
    rev: {
      dist: {
        files: {
          src: [
            'dist/scripts/{,*/}*.js',
            'dist/assets/styles/{,*/}*.css',
            // TODO: Need to apply rev to handlebars templates before they are compiled
            // 'dist/assets/img/{,*/}*.{png,jpg,jpeg,gif,webp}',
            'dist/assets/styles/fonts/*'
          ]
        }
      }
    },

    // Usemin
    // ------------------
    useminPrepare: {
      html: 'app/index.html',
      options: {
        dest: 'dist'
      }
    },
    usemin: {
      html: ['dist/{,*/}*.html'],
      css: ['dist/assets/styles/{,*/}*.css'],
      options: {
        dirs: ['dist']
      }
    },

    // Image minification
    // ------------------
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: 'app/img',
          src: '{,*/}*.{png,jpg,jpeg}',
          dest: 'dist/img'
        }]
      }
    },
    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: 'assets/img',
          src: '{,*/}*.svg',
          dest: 'dist/img'
        }]
      }
    },

    htmlmin: {
      dist: {
        files: [{
          expand: true,
          cwd: 'app',
          src: '*.html',
          dest: 'dist'
        }]
      }
    },

    // Ember-specific tasks
    // ------------------
    emberTemplates: {
      options: {
        // "app/application.hbs" => "application"
        // "app/modules/my_module/templates/my_module.hbs" => "my_module"
				// "app/modules/my_module/templates/index.hbs" => "my_module/index"
        // "app/modules/my_module/templates/foo.hbs" => "my_module/foo"
        // "app/modules/my_module/templates/bar/foo.hbs" => "my_module/bar/foo"
        // "app/templates/foo.hbs" => "foo"
        // "app/partials/foo.hbs" => "_foo"
        // "app/modules/my_module/partials/bar.hbs" => "my_module/_bar"
        templateName: function (sourceFile) {
          console.log('Compiling: '.green + sourceFile);

          var matches = sourceFile.match(new RegExp('(?:app/modules/(.*?)/|app/)(templates|partials)?/?(.*)')),
            moduleName = matches[1],
            isMainModule = (moduleName === 'main'),
            isPartial = (matches[2] === 'partials'),
            fileName = matches[3],
            prefix = '_';

          // app/modules/main/templates/index.handlebars => "index"
          if (moduleName && !isMainModule) {
            if (fileName === moduleName) {
              return moduleName;
            } else {
              if (isPartial) return moduleName+'/'+prefix+fileName;
              else return moduleName+'/'+fileName;
            }
          } else {
            if (isPartial) return prefix+fileName;
            else return fileName;
          }
        }
      },
      dev: {
        files: {
          'tmp/app/compiled-templates.js': [
            'app/**/*.hbs',
            'app/**/*.handlebars'
          ]
        }
      }
    },

    neuter: {
      app: {
        options: {
          filepathTransform: function(filepath){ return template.process('app/') + filepath; },
          includeSourceMap: true
        },
        src: 'app/app.js',
        dest: 'tmp/app/app.js'
      },
      test: {
        options: {
          filepathTransform: function(filepath){ return template.process('test/') + filepath; },
          includeSourceMap: true
        },
        src: 'test/main.js',
        dest: 'tmp/spec/spec.js'
      }
    },

    copy: {
      dev: {
        files: [
          { dest: 'tmp/index.html', src: ['app/index.html'] },
          { expand: true, dest: 'tmp/', src: ['assets/**'] },

          // copy uncompiled app js to /tmp for debugging (source maps)
          { expand: true, dest: 'tmp/app', src: ['app/**'] },

          { expand: true, dest: 'tmp/', src: ['bower_components/**'] }
        ]
      },
      test: {
        files: [
          { dest: 'tmp/index.html', src: ['test/index.html'] }
        ]
      },
      dist: {
        files: [
          {
            expand: true,
            dot: true,
            cwd: 'app/',
            dest: 'dist/',
            src: [
              '*.{ico,txt}',
              '.htaccess'
            ]
          },
          {
            expand: true,
            src: ['assets/img/{,*/}*.{ico,png,jpg,jpeg,gif,webp}'],
            dest: 'dist/'
          },
          {
            expand: true,
            src: ['assets/fonts/*'],
            dest: 'dist/'
          }
        ]
      }
    }

  }
};
