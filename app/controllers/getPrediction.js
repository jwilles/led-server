const request = require('request');
const requestPromise = require('request-promise-native');
const xml2js = require('xml2js');
const xmlParser = xml2js.parseString;

const ttc_base = 'http://webservices.nextbus.com/service/publicXMLFeed?';

getPrediction =  (req, res) => {

  let stops = req.query.stops
  const prediction_endpoint = ttc_base + "command=predictions&a=ttc&stopId=";

  predict_endpoints = [];

  if (stops.constructor === Array) {
    stops.forEach((stop) => {
      predict_endpoints.push(prediction_endpoint + stop);  
    });
  } else {
    predict_endpoints.push(prediction_endpoint + stops);
    stops = [stops];
  }

  let requestArray = [];

  predict_endpoints.forEach((endpoint) => {
    requestArray.push(requestPromise(endpoint));
  });
 
  Promise.all(requestArray)
    .then((results) => {
      nextArrivals = [];
      results.forEach((stop) => {
        xmlParser(stop, function(err, result) {
          let nextVehicle = {
		direction: result.body.predictions[0].direction[0]['$'].title,
                eta: result.body.predictions[0].direction[0].prediction[0]['$'].minutes
	  } 
          nextArrivals.push(nextVehicle);
        });
      });
      res.json(nextArrivals);
    })
    .catch((err) => {
	console.log(err);
    });
};

module.exports = getPrediction;
