<%= _.classify(appname) %>.rootElement = "#ember";
<%= _.classify(appname) %>.setupForTesting();
<%= _.classify(appname) %>.injectTestHelpers();

// stub out the start() and stop() qunit methods ember-testing tries to use
window.start = function() {};
window.stop = function() {};

require("spec/*");
