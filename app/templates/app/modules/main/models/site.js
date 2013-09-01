<% if (epf) { %>
<%= _.classify(appname) %>.Site = Ep.Model.extend({
  title: Ep.attr('string'),
  link: Ep.attr('string')
});
<% } else { %>
<%= _.classify(appname) %>.Site = DS.Model.extend({
  title: DS.attr('string'),
  link: DS.attr('string')
});

<%= _.classify(appname) %>.Site.FIXTURES = [
  {
    id: 1,
    title: 'About',
    link: 'about'
  },
  {
    id: 2,
    title: 'Contact',
    link: 'contact'
  },
  {
    id: 3,
    title: 'Todos',
    link: 'todos'
  }
];
<% } %>
