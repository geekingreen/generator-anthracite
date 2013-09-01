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
    id: 'a',
    name: 'Walk the dog',
    isDone: false
  }, {
    id: 'b',
    name: 'Buy groceries',
    isDone: false
  }]; <%
} %>
