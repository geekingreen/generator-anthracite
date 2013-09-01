<%= _.classify(appname) %>.ApplicationRoute = Ember.Route.extend({

    model: function (params) {
        <% if (epf) { %>
        this.session.merge(this.session.create('site', { id: '1', title: 'About', link: 'about' }));
        this.session.merge(this.session.create('site', { id: '2', title: 'Contact', link: 'contact' }));
        this.session.merge(this.session.create('site', { id: '3', title: 'Todos', link: 'todos' }));
        // Currently EPF's LocalAdapter doesn't support finding more than one model at a time...
        return [this.session.find('site', 1), this.session.find('site', 2), this.session.find('site', 3)];
        <% } else { %>
        return <%= _.classify(appname) %>.Site.find();
        <% } %>
    }
});
