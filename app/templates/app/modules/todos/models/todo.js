<%= _.classify(appname) %>.Todo = DS.Model.extend({
	title: DS.attr('string'),
	done: DS.attr('boolean'),

	// Update the database immediately upon checking done
	doneDidChange: function () {
		if (this.get('isDirty')) this.save();
	}.observes('done')
});
