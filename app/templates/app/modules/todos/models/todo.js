<%
if (epf) { %>
  <%= _.classify(appname) %>.Todo = Ep.Model.extend({
    name: Ep.attr('string'),
    isDone: Ep.attr('boolean')
  }); <%
} else { %>
  <%= _.classify(appname) %>.Todo = DS.Model.extend({
    name: DS.attr('string'),
    isDone: DS.attr('boolean')
  });

  <%= _.classify(appname) %>.Todo.FIXTURES = [{
    id: 1,
    name: 'Walk the dog',
    isDone: false
  }, {
    id: 2,
    name: 'Buy groceries',
    isDone: false
  }]; <%
} %>
