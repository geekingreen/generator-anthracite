<%= _.classify(appname) %>.TodosEditView = Ember.View.extend({
<% if (twitterBootstrap) { %>
	classNames: ['modal', 'fade'],

	didInsertElement: function () {
		this.$().modal({
			show: true
		});
	}
<% } else if (zurbFoundation) { %>
	classNames: ['reveal-modal'],
	attributeBindings: ['data-reveal'],

	'data-reveal': true,

	didInsertElement: function () {
		this.$().foundation();
		this.$().foundation('reveal', 'open');
	}
<% } else if (semanticUI) { %>
	classNames: ['ui', 'modal'],

	didInsertElement: function () {
		var view = this;
		this.$().modal('setting', {
			closable: false
		}).modal('show');
	}
<% } %>
});
