<%= _.classify(appname) %>.TodosNewController = Ember.Controller.extend(<%= _.classify(appname) %>.TodoModalMixin, {
	actions: {
		save: function (modal) {
			var controller = this,
				todo = this.get('model');

			todo.save().then(function () {
				controller.closeModal(modal);
			});
		},

		cancel: function (modal) {
			var todo = this.get('model');

			todo.deleteRecord();

			this.closeModal(modal);
		}
	}
});

