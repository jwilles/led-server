const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000

const stations = {
	Bathurst: 5, 
	Spadina: 15,
	Lansdowne: 10
};

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', (req, res) => {
  res.send('hello world');
});

app.get('/station', (req, res) => {
  res.json({ 
    station: 'Bathurst',
    lat: 0,
    lon: 0
  });

});

app.get('/schedule', (req, res) => {

  var req_station = req.query.station

  res.json({
    station: req_station,
    next_bus: stations[req_station]
  });
});


app.listen(PORT, () => {
  console.log('Listening on port' + PORT);
});



