<%= _.classify(appname) %>.ApplicationRoute = Ember.Route.extend({
  setupController: function (controller, model) {
    <% if (epf) { %>
    this.session.merge(this.session.create('site', { id: '1', title: 'geekingreen.com', url: 'http://geekingreen.com' }));
    this.session.merge(this.session.create('site', { id: '2', title: 'Reddit', url: 'http://reddit.com' }));
    // Currently EPF's LocalAdapter doesn't support finding more than one model at a time...
    controller.set('content', [this.session.find('site', 1), this.session.find('site', 2)]);
    <% } else { %>
    controller.set('content', <%= _.classify(appname) %>.Site.find());
    <% } %>
  }
});
