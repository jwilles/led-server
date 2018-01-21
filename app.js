const express = require('express');
const request = require('request');
const requestPromise = require('request-promise-native');
const xml2js = require('xml2js');
const xmlParser = xml2js.parseString;
const app = express();

const PORT = process.env.PORT || 3000

const ttc_base = 'http://webservices.nextbus.com/service/publicXMLFeed?';

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', (req, res) => {
  res.send('hello world');
});

app.get('/routes', (req, res) => {
  
  let routes = {}
  const routes_endpoint = ttc_base + "command=routeList&a=ttc";
  
  request(routes_endpoint, function(err, api_res, body) {
    xmlParser(body, function(err, result) {
      if (err) {
	return res.send(err);
      }
      result.body.route.forEach(function(element) {
        routes[element['$'].tag] = element['$'].title
      });
      res.json({ routes: routes });
    });
  });
});

app.get('/stops', (req, res) => {

  let req_route = req.query.route
  const stop_endpoint = ttc_base + "command=routeConfig&a=ttc&r=" + req_route;

  let stops = {};

  request(stop_endpoint, function(err, api_res, body) {
    xmlParser(body, function(err, result) {
      result.body.route[0].stop.forEach(function(element){
        stops[element['$'].tag] = { title: element['$'].title, stopId: element['$'].stopId };
      });
      res.json(stops);
    });
  });
});

app.get('/predict', (req, res) => {

  const stops = req.query.stops


  const prediction_endpoint = ttc_base + "command=predictions&a=ttc&stopId=" + stops[0];
 
  res.send(stops); 
  

//  request(prediction_endpoint, function(err, api_res, body) {
//    xmlParser(body, function(err, result) {
//      res.json(result);
//    });
//  });
});


app.listen(PORT, () => {
  console.log('Listening on port: ' + PORT);
});



