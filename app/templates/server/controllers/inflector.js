var orm = require('orm'),
	natural = require('natural'),
	inflector = new natural.NounInflector();

module.exports = {
	post: function (req, res) {
		var modelName = inflector.singularize(req.params.modelName),
			Model = req.models[modelName];

		if (Model) {
			Model.create([req.body], function (err, models) {
				if (err) {
					res.json(modelError(err), 422);
				}
				else {
					res.json(models[0]);
				}
			});
		}
		else {
			res.json(globalError('Model ' + modelName + ' not found'), 404);
		}
	},

	findMany: function (req, res) {
		var modelName = inflector.singularize(req.params.modelName),
			Model = req.models[modelName],
			query = {};

		if (Model) {
			if (req.query && req.query.ids) {
				query.id = req.query.ids;
			}
			else if (req.query) {
				for (var key in req.query) {
					query[key] = orm.like('%' + req.query[key] + '%');
				}
			}

			Model.find(query, function (err, models) {
				if (err) {
					res.json(globalError(err.toString()));
				}
				res.json(models);
			});
		}
		else {
			res.json(globalError('Model ' + modelName + ' not found'), 404);
		}
	},

	findOne: function (req, res) {
		var modelName = inflector.singularize(req.params.modelName),
			Model = req.models[modelName],
			id = req.params.id;

		if (Model) {
			Model.get(id, function (err, model) {
				if (err) {
					res.json(globalError(err.toString()), 404);
				}
				res.json(model);
			});
		}
		else {
			res.json(globalError('Model ' + modelName + ' not found'), 404);
		}
	},

	put: function (req, res) {
		var modelName = inflector.singularize(req.params.modelName),
			Model = req.models[modelName],
			id = req.params.id;

		if (Model) {
			Model.get(id, function (err, model) {
				if (err) {
					res.json(err.toString(), 404);
				}
				model.save(req.body, function (err) {
					if (err) {
						res.json(modelError(err), 422);
					}
					res.json(model);
				});
			});
		}
		else {
			res.json(globalError('Model ' + modelName + ' not found'), 404);
		}
	},

	delete: function (req, res) {
		var modelName = inflector.singularize(req.params.modelName),
			Model = req.models[modelName],
			id = req.params.id;

		if (Model) {
			Model.find({
				id: id
			}).remove(function (err) {
				if (err) {
					res.json(globalError(err.toString()));
				}
				res.end();
			});
		}
		else {
			res.json(globalError('Model ' + modelName + ' does not exist'), 500);
		}
	}
};

function capFirst(str) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

// Error helpers
function globalError(message) {
	return {
		errors: {
			global: message
		}
	};
}

function modelError(err) {
	var errorModel = {
		errors: {}
	};

	for (var i = 0; i < err.length; i++) {
		errorModel.errors[err[i].property] = err[i].msg;
	}

	return errorModel;
}