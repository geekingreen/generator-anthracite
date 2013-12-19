<%= _.classify(appname) %>.TodosRoute = Ember.Route.extend({
	model: function () {
		return this.store.find('todo');
	}
});
