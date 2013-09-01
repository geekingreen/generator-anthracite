<%= _.classify(appname) %>.TodosRoute = Ember.Route.extend({
  model: function(params) { <%
    if (epf) { %>
        this.session.merge(this.session.create('todo', {
          id: '1',
          name: 'Walk the dog',
          isDone: false
        }));
      this.session.merge(this.session.create('todo', {
        id: '2',
        name: 'Buy groceries',
        isDone: false
      }));
      // Currently EPF's LocalAdapter doesn't support finding more than one model at a time...
      return [this.session.find('todo', 1), this.session.find('todo', 2)]; <%
    } else { %>
      return this.store.find('todo'); <%
    } %>
  }
});
