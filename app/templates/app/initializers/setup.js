Ember.Application.initializer({
	name: 'setup',

	initialize: function(container, application) {
		// Force the menu to collapse on navigation
		$('body').on('click', '.navbar-collapse li', function () {
			$('.navbar-collapse').collapse('hide');
		});

		<% if (zurbFoundation) { %>
		$(document).foundation();
		<% } %>
	}
});
