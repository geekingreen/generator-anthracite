<%= _.classify(appname) %>.<%= _.classify(name) %> = DS.Model.extend({
  title: DS.attr('string'),
  url: DS.attr('string')
});

<%= _.classify(appname) %>.<%= _.classify(name) %>.FIXTURES = [
];