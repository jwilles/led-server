const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.send('hello world');
});

app.get('/station'), (req, res) => {
  res.json({ 
    station: 'Bathurst',
    lat: 0,
    lon: 0
  })
});


app.listen(PORT, () => {
  console.log('Listening on port' + PORT);
});



