<% if (epf) { %>
<%= _.classify(appname) %>.Adapter = Ep.LocalAdapter.extend();
<% } else { %>
<%= _.classify(appname) %>.Store = DS.Store.extend({
  revision: 12,
  adapter: DS.FixtureAdapter.create()
});
<% } %>
