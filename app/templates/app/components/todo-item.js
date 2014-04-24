<%= _.classify(appname) %>.TodoItemComponent = Ember.Component.extend({
<% if (twitterBootstrap) { %>
	tagName: 'li',
	classNames: ['list-group-item'],
<% } else if (zurbFoundation) { %>
	tagName: 'li',
<% } else if (semanticUI) { %>
	classNames: ['item'],	
<% } %>
	classNameBindings: ['todo.done']
});
