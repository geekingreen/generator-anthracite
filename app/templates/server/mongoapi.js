var PORT = 3000,
  SSL_PORT = 3443,
  API_URL = '/api',
  CONNECTION_STRING = 'mongodb://localhost/geekingreen'; // mongodb://user:pass@host:port/db?options...

var fs = require('fs');
var http = require('http');
var https = require('https');
var mongoose = require('mongoose');
var express = require('express');

var ssl_options = false;
// var ssl_options = {
//  key: fs.readFileSync('server-key.pem'),
//  cert: fs.readFileSync('server-crt.pem')
// };

mongoose.connect(CONNECTION_STRING);
var db = mongoose.connect

  function emberfyModel(app, model, modelName, modelPlural) {
    app.get(API_URL + '/' + modelPlural, function(req, res) {
      var ormQuery = req.query;
      for (key in ormQuery) {
        if (ormQuery.hasOwnProperty(key)) {
          ormQuery[key] = new RegExp(req.query[key], 'i');
        }
      }
      model.find(ormQuery ? ormQuery : {}, function(err, items) {
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
      model.findById(req.params.id, function(err, item) {
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
      var newModel = new model(req.body[modelName]);
      newModel.save(function(err, item) {
        if (err) {
          res.send(500, err);
        } else {
          var obj = {};
          obj[modelName] = item;
          res.send(obj);
        }
      });
    });

    app.put(API_URL + '/' + modelPlural + '/:id', function(req, res) {
      model.update({
        _id: req.params.id
      }, req.body[modelName], function(err, item) {
        if (err) {
          res.send(500, err);
        } else {
          var obj = {};
          obj[modelName] = item;
          res.send(obj);
        }
      });
    });

    app.delete(API_URL + '/' + modelPlural + '/:id', function(req, res) {
      model.remove({
        _id: req.params.id
      }, function(err) {
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
  app.use(app.router);
});

// All options return the same thing
app.options('*', function(req, res) {
  res.send(200);
});

/*
  ADD YOUR MODELS HERE
*/
emberfyModel(app, require('./models/message')(mongoose), 'message', 'messages');

http.createServer(app).listen(PORT);
if (ssl_options) {
  https.createServer(ssl_options, app).listen(SSL_PORT);
}
