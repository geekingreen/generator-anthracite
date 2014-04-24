<%= _.classify(appname) %>.TodoModalMixin = Ember.Mixin.create({
	closeModal: function (modal) {
		var controller = this;
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
		<% } else if (semanticUI) { %>
		controller.transitionToRoute('todos.index');
		<% } %>
	}
});
