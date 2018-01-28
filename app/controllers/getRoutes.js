const xml2js = require('xml2js');
const xmlParser = xml2js.parseString;
const request = require('request');

const ttc_base = 'http://webservices.nextbus.com/service/publicXMLFeed?';

getRoutes =  (req, res) => {
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
}

module.exports = getRoutes;


