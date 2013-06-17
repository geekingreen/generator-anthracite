Ember.Handlebars.registerBoundHelper('wordCount', function (value) {
  var ret;
  if (typeof value === 'string')
    return ((ret = value.trim().match(/\s+/g).length) > 0) ? (ret + 1) : '0';
  return '0';
});