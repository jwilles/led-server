const xml2js = require('xml2js');
const xmlParser = xml2js.parseString;
const request = require('request');

const ttc_base = 'http://webservices.nextbus.com/service/publicXMLFeed?';

getStops = (req, res) => {

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
};

module.exports = getStops;

