<%= _.classify(appname) %>.ApplicationView = Ember.View.extend({
<% if (zurbFoundation) { %>
	didInsertElement: function () {
		// After the application has rendered its view initialize foundation
		this.$().foundation();
	}
<% } %>
});
