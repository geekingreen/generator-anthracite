<%= _.classify(appname) %>.Router.map(function () {
	this.resource('todos', function () {
		this.route('new');
		this.route('edit', {
			path: '/:todo_id'
		});
	});
	this.route('about');
	this.route('contact');
	this.route('error404', { path: '*:' });
});
