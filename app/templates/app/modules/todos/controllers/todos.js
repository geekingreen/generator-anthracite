<%= _.classify(appname) %>.TodosController = Ember.ArrayController.extend({
	actions: {
		removeDone: function () {
			var doneTodos = this.filterBy('done');
			doneTodos.invoke('deleteRecord');
			doneTodos.invoke('save');
		}
	}
});
