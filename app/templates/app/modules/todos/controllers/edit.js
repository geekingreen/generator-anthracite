<%= _.classify(appname) %>.TodosEditController = Ember.ObjectController.extend(<%= _.classify(appname) %>.TodoModalMixin, {
	actions: {
		save: function (modal) {
			var controller = this,
				person = this.get('model');

			person.save().then(function () {
				controller.closeModal.call(controller, modal);
			});
		},

		cancel: function (modal) {
			var person = this.get('model');

			person.rollback();

			this.closeModal.call(this, modal);
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
