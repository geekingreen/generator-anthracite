<%= _.classify(appname) %>.TodoItemComponent = Ember.Component.extend({
  item: null,

  keyDown: function (event) {
    if (event.which === 13) {
      event.preventDefault();

      var item = this.get('item'),
        editable = this.$('.todo-editable');
      item.set('name', editable.text());
      <% if (epf) { %>
      item.session.flush();
      <% } else { %>
      item.save();
      <% } %>

      editable.prop('contenteditable', false).blur();
    }
  },

  actions: {
    edit: function () {
      this.$('.todo-editable').prop('contenteditable', true).focus();
    },

    delete: function () {
      var item = this.get('item');
      <% if (epf) { %>
      // epf's local testing doesn't work well so this won't work
      item.session.deleteModel(item);
      item.session.flush();
      <% } else { %>
      item.deleteRecord();
      //item.save();
      <% } %>
    }
  }
});
