# generator-anthracite
A different take on an Ember generator for yeoman.

## Updates
- Removed bowerrc in favor of default bower_components folder

## Getting started
- Make sure you have [yo](https://github.com/yeoman/yo) installed:
    `npm install -g yo`
- Install the generator: `npm install -g generator-anthracite`
- Run: `yo anthracite`
- To generate additional modules run: `yo anthracite:module <module name>`

## Modules
#### *Module*
Each module will automatically namespace its templates like this:

* "app/modules/module/templates/index.hbs" => "module"
* "app/modules/module/templates/foo.hbs" => "module/foo"
* "app/modules/module/templates/foo/bar.hbs" => "module/foo/bar"

or partials like:
* "app/modules/module/partials/partial.hbs" => "module/_partial"

Each module may contain many:

- routes
- controllers
- views
- templates
- partials

#### *Main Module*
The main module contains non namespaced templates. This is probably the
place where you would want to put your basic pages like:

- About
- Contact

## Credits
Thanks to [generator-ember](https://github.com/yeoman/generator-ember) 
and [generator-charcoal](https://github.com/thomasboyt/charcoal) as I used a lot of their code 
and configuration as reference. 

## License
[MIT License](http://en.wikipedia.org/wiki/MIT_License)
