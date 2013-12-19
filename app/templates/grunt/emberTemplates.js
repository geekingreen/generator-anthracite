module.exports = {
	options: {
		preprocess: function (source) {
			return source.replace(/\s+/g, ' ');
		},

		templateName: function (sourceFile) {
			/*
				These are how templates will be named based on their folder
				structure.

				components/[name].hbs ==> components/[name]
				partials/[name].hbs ==> _[name]

				modules/application/templates/[name].hbs ==> [name]
				modules/application/partials/[name].hbs ==> _[name]
				modules/[moduleName]/templates/[moduleName].hbs ==> [moduleName]
				modules/[moduleName]/templates/[name].hbs ==> [moduleName]/[name]
				modules/[moduleName]/partials/[name].hbs ==> [moduleName]/_[name]

				Additionally any template that is nested deeper will have that
				structure added as well.

				modules/[moduleName]/templates/[folder1]/[folder2]/[name] ==> [moduleName]/[folder1]/[folder2]/[name]
			*/
			var matches = sourceFile.match(new RegExp('(?:app/modules/(.*?)/|app/)(templates|partials)?/?(.*)')),
				moduleName = matches[1],
				isAppModule = (moduleName === 'application'),
				isPartial = (matches[2] === 'partials'),
				fileName = matches[3],
				prefix = (isPartial ? '_' : ''),
				templateName = '';

			if (moduleName && !isAppModule) {
				if (fileName === moduleName) {
					templateName = moduleName;
				}
				else {
					templateName = moduleName + '/' + prefix + fileName;
				}
			}
			else {
				templateName = prefix + fileName;
			}

			console.log('Compiling ' + sourceFile.blue + ' to ' + templateName.green);

			return templateName;
		}
	},
	compile: {
		files: {
			'tmp/compiled-templates.js': ['templates/**/*.{hbs,handlebars}', 'app/**/*.{hbs,handlebars}']
		}
	}
};
