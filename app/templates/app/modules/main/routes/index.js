<%= _.classify(appname) %>.IndexRoute = Ember.Route.extend({
  setupController: function (controller, model) {
    controller.set('content', <%= _.classify(appname) %>.Site.find());
  }
});