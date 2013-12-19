<% if (twitterBootstrap) { %>
<%= _.classify(appname) %>.TodosEditView = Ember.View.extend({
	classNames: ['modal', 'fade'],

	didInsertElement: function () {
		this.$().modal({
			show: true
		});
	}
});
<% } else if (zurbFoundation) { %>
<%= _.classify(appname) %>.TodosEditView = Ember.View.extend({
	classNames: ['reveal-modal'],
	attributeBindings: ['data-reveal'],

	'data-reveal': true,

	didInsertElement: function () {
		this.$().foundation('reveal', 'open');
	}
});
<% } %>
