<% if (epf) { %>
<%= _.classify(appname) %>.Adapter = Ep.LocalAdapter.extend();
<% } else { %>
<%= _.classify(appname) %>.ApplicationAdapter = DS.FixtureAdapter.extend();
<% } %>
