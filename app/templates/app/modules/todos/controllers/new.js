<%= _.classify(appname) %>.TodosNewController = Ember.ObjectController.extend({
	actions: {
		save: function (modal) {
			var controller = this,
				person = this.get('model');

			person.save().then(function () {
				hideModal(modal, controller);
			});
		},

		cancel: function (modal) {
			var person = this.get('model');

			person.deleteRecord();

			hideModal(modal, this);
		}
	}
});

function hideModal(modal, controller) {
	<% if (twitterBootstrap) { %>
	modal.$().on('hidden.bs.modal', function () {
		controller.transitionToRoute('todos.index');
	});
	modal.$().modal('hide');
	<% } else if (zurbFoundation) { %>
	modal.$().on('closed', function () {
		controller.transitionToRoute('todos.index');
	});
	modal.$().foundation('reveal', 'close');
	<% } %>
}
