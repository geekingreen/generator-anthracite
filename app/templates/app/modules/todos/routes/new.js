<%= _.classify(appname) %>.TodosNewRoute = Ember.Route.extend({
	model: function () {
		return this.store.createRecord('todo');
	}
});
