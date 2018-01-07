const express = require('express');
const request = require('request');
const xml2js = require('xml2js');
const xmlParser = xml2js.parseString;
const app = express();

const PORT = process.env.PORT || 3000

const stations_list = [
	'Bathurst',
	'Spadina',
	'Lansdowne'
]

const schedule = {
	Bathurst: 5, 
	Spadina: 15,
	Lansdowne: 10
};

const ttc_endpoint = 'http://webservices.nextbus.com/service/publicXMLFeed?command=routeList&a=ttc';

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', (req, res) => {
  res.send('hello world');
});

app.get('/stations', (req, res) => {
  res.json({ stations: stations_list});
});

app.get('/routes', (req, res) => {
  
  routes = {}
  
  request(ttc_endpoint, function(err, api_res, body) {
    xmlParser(body, function(err, result) {
      result.body.route.forEach(function(element) {
        routes[element['$'].tag] = element['$'].title
      });
      res.json({ routes: routes });
    });
  });
});

app.get('/schedule', (req, res) => {

  var req_station = req.query.station

  res.json({
    station: req_station,
    next_bus: schedule[req_station]
  });
});


app.listen(PORT, () => {
  console.log('Listening on port' + PORT);
});



