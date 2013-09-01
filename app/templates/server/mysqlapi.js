var PORT = 3000,
  SSL_PORT = 3443,
  API_URL = '/api',
  CONNECTION_STRING = 'mysql://root:root@localhost/geekingreen';

var fs = require('fs');
var http = require('http');
var https = require('https');
var orm = require('orm');
var express = require('express');

orm.settings.set('instance.returnAllErrors', true);

var ssl_options = false;
// var ssl_options = {
//  key: fs.readFileSync('server-key.pem'),
//  cert: fs.readFileSync('server-crt.pem')
// };

function emberfyModel(app, modelName, modelPlural) {
  app.get(API_URL + '/' + modelPlural, function(req, res) {
    var ormQuery = req.query;
    for (key in ormQuery) {
      if (ormQuery.hasOwnProperty(key)) {
        ormQuery[key] = orm.like('%' + req.query[key] + '%');
      }
    }
    req.models[modelName].find(ormQuery ? ormQuery : {}, function(err, items) {
      if (err) {
        res.send(500, err);
      } else {
        var obj = {};
        obj[modelPlural] = items;
        res.send(obj);
      }
    });
  });

  app.get(API_URL + '/' + modelPlural + '/:id', function(req, res) {
    req.models[modelName].get(req.params.id, function(err, item) {
      if (err) {
        res.send(500, err);
      } else {
        var obj = {};
        obj[modelName] = item;
        res.send(obj);
      }
    });
  });

  app.post(API_URL + '/' + modelPlural, function(req, res) {
    req.models[modelName].create([req.body[modelName]], function(err, items) {
      if (err) {
        res.send(500, err);
      } else {
        var obj = {};
        obj[modelName] = items[0];
        res.send(obj);
      }
    });
  });

  app.put(API_URL + '/' + modelPlural + '/:id', function(req, res) {
    req.models[modelName].get(req.params.id, function(err, item) {
      if (err) {
        res.send(500, err);
      } else {
        item.save(req.body[modelName], function(err) {
          if (err) {
            res.send(500, err);
          } else {
            var obj = {};
            obj[modelName] = item;
            res.send(obj);
          }
        });
      }
    });
  });

  app.delete(API_URL + '/' + modelPlural + '/:id', function(req, res) {
    req.models[modelName].find({
      id: req.params.id
    }).remove(function(err) {
      if (err) {
        res.send(500, err);
      } else {
        res.send(200);
      }
    });
  });
}

var app = express();

app.configure(function() {
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  // If you want to serve your Ember page as well
  app.use('/', express.static('/Users/agifford/Workspace/test/dist'));
  app.use(orm.express(CONNECTION_STRING, {
    define: function(db, models) {
      /*
        ADD YOUR MODELS HERE
      */
      models.message = require('./models/message')(orm, db);
      emberfyModel(app, 'message', 'messages');

      db.sync();
    }
  }));
  app.use(app.router);
});

// All options return the same thing
app.options('*', function(req, res) {
  res.send(200);
});

http.createServer(app).listen(PORT);
if (ssl_options) {
  https.createServer(ssl_options, app).listen(SSL_PORT);
}
