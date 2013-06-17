<%= _.classify(appname) %>.<%= _.classify(name) %>Route = Ember.Route.extend({
  setupController: function (controller, model) {
    controller.set('content', <%= _.classify(appname) %>.Site.find());
  }
});