<%= _.classify(appname) %>.Store = DS.Store.extend({
  revision: 12,
  adapter: DS.FixtureAdapter.create()
});
