<%= _.classify(appname) %>.Router.map(function() {
<% if(!empty) { %>
  this.route('about', { path: '/about' });
  this.route('contact', { path: '/contact_me' });

  this.resource('todos', function () {
    this.route('index', { path: '/' });
  });
 <% } %>
});
