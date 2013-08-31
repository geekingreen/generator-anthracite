<%= _.classify(appname) %>.rootElement = "#ember";
<%= _.classify(appname) %>.setupForTesting();
<%= _.classify(appname) %>.injectTestHelpers();

require("spec/*");
