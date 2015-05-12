var NODE_ENV = process.env.NODE_ENV,
	bodyParser = require('body-parser'),
	express = require('express'),
	server = express();

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));

require('./app')(server);
<% if(serverExample) { %>require('./server')(server);<% } %>

if (NODE_ENV === 'production') {
	server.listen(8001, 'localhost');
} else {
	// Export server in dev to work with grunt-express
	module.exports = server;
}
