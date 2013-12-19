<%= _.classify(appname) %>.ApplicationAdapter = DS.RESTAdapter.extend({
	namespace: 'api',
	ajaxError: function(jqXHR) {
		var error = this._super(jqXHR);

		if (jqXHR && jqXHR.status === 422) {
			var errors = Ember.$.parseJSON(jqXHR.responseText)["errors"];

			return new DS.InvalidError(errors);
		} else {
			return error;
		}
	}
});

<%= _.classify(appname) %>.ApplicationSerializer = DS.RESTSerializer.extend({
	extractSingle: function(store, type, payload, id, requestType) {
		var finalPayload = {};
		finalPayload[type.typeKey] = payload;
		return this._super(store, type, finalPayload, id, requestType);
	},

	extractArray: function(store, type, payload, id, requestType) {
		var finalPayload = {};
		finalPayload[Ember.String.pluralize(type.typeKey)] = payload;
		return this._super(store, type, finalPayload, id, requestType);
	},

	serializeIntoHash: function(data, type, record, options) {
		var serializedData = this.serialize(record, options);
		for (var key in serializedData) {
			if (Ember.isArray(serializedData[key]) && !serializedData[key].length) {

			} else {
				data[key] = serializedData[key];
			}
		}
	},

	keyForRelationship: function(key, kind) {

		key = Ember.String.decamelize(key);
		if (kind === "belongsTo") {
			return key + "_id";
		} else {
			return key;
		}
	},

	normalizeRelationships: function(type, hash) {
		var payloadKey, key, objList, idList = [];

		if (this.keyForRelationship) {
			type.eachRelationship(function(key, relationship) {
				payloadKey = this.keyForRelationship(key, relationship.kind);

				objList = hash[payloadKey] || [];

				objList.forEach(function(item) {
					idList.push(Ember.get(item, 'id'));
				});

				hash[key] = idList;
				delete hash[payloadKey];
			}, this);
		}
	}
});
