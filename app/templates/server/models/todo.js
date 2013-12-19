var orm = require('orm');

module.exports = function (db) {
	return db.define('person', {
		title: String,
		done: Boolean
	}, {
		autoFetch: true,
		validations: {
			title: [orm.enforce.required('Title is required'), orm.enforce.notEmptyString('Title is required')]
		}
	});
};