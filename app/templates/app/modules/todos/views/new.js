<% if (twitterBootstrap) { %>
<%= _.classify(appname) %>.TodosNewView = Ember.View.extend({
	templateName: 'todos/edit',
	classNames: ['modal', 'fade'],

	didInsertElement: function () {
		this.$().modal({
			show: true
		});
	}
});
<% } else if (zurbFoundation) { %>
<%= _.classify(appname) %>.TodosNewView = Ember.View.extend({
	templateName: 'todos/edit',
	classNames: ['reveal-modal'],
	attributeBindings: ['data-reveal'],

	'data-reveal': true,

	didInsertElement: function () {
		this.$().foundation('reveal', 'open');
	}
});
<% } %>
