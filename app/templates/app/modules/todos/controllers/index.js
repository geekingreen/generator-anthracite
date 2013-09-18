<%= _.classify(appname) %>.TodosIndexController = Ember.Controller.extend({
  needs: ['todos'],

  actions: {
    newTodo: function() { <%
      if (epf) { %>
        var todo = this.session.create('todo', {
          name: 'Get r done'
        });
        this.session.merge(todo);
        this.get('controllers.todos').pushObject(todo); <%
      } else { %>
        var newTodo = this.store.createRecord('todo', {
          name: 'Get r done'
        });
        newTodo.save(); <%
      } %>
    },

    clearDone: function() {
      var todos = this.get('controllers.todos');
      var allDone = todos.filter(function(todo) {
        return todo.get('isDone');
      });

      while (allDone.length > 0) {
        var todo = allDone.pop(); <%
        if (epf) { %>
          // epf doesn't have great local testing so manually delete it as well
          this.get('controllers.todos').removeObject(todo);
          this.session.deleteModel(todo);
          this.session.flush(); <%
        } else { %>
          todo.deleteRecord();
          todo.save(); <%
        } %>
      }
    }
  }
});
