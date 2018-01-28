const express = require('express');
const request = require('request');
const requestPromise = require('request-promise-native');
const xml2js = require('xml2js');
const xmlParser = xml2js.parseString;
const app = express();

const routes = require('./app/routes');

const PORT = process.env.PORT || 3000

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/', routes);

app.listen(PORT, () => {
  console.log('Listening on port: ' + PORT);
});



