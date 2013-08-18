<% if (epf) { %>
<%= _.classify(appname) %>.Site = Ep.Model.extend({
  title: Ep.attr('string'),
  url: Ep.attr('string')
});
<% } else { %>
<%= _.classify(appname) %>.Site = DS.Model.extend({
  title: DS.attr('string'),
  url: DS.attr('string')
});

<%= _.classify(appname) %>.Site.FIXTURES = [
  {
    id: 1,
    title: 'geekingreen.com',
    url: 'http://geekingreen.com'
  },
  {
    id: 2,
    title: 'Reddit',
    url: 'http://reddit.com'
  }
];
<% } %>
