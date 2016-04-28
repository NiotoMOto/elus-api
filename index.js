
const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const apiRoutes = require('./routes/api');
const testDeputes = require('./routes/testJson/testDeputes');
require('pretty-error').start();

const populateDatabase = require('./mongo/populate.js');

if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

app.use(bodyParser.json());
app.use(methodOverride());

app.use(apiRoutes);
app.use(testDeputes);

populateDatabase();

app.listen(4001, function () {
  console.log('Serveur mise en route sur le port 3000');
});
