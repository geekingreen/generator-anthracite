window.<%= _.classify(appname) %> = Ember.Application.create();

// These requires will be appended to this file using grunt-neuter
require('./initializers/*');
require('./helpers/*');
require('./mixins/*');

require('./modules/*/models/*');
require('./modules/*/routes/*');
require('./modules/*/controllers/*');
require('./modules/*/views/*');

require('./config/store');
require('./config/router');
