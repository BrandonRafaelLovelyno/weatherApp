const weather = require('../weatherApp/weather')
const express = require('express')
const app = express()

app.set('view engine', 'ejs');
app.set('views', './views'); // Replace './views' with your folder path.

app.use(express.static('public'))

app.listen(3000, () => {
  console.log(`Example app listening on port 3000`)
})

app.get('/', (req, res) => {
  res.render('index')
})

app.get('/jsonData', (req, res) => {
  const latitude=parseFloat(req.query.latitude)
  const longitude=parseFloat(req.query.longitude)
  console.log(latitude,longitude)
  weather.getWeatherData(latitude,longitude, Intl.DateTimeFormat().resolvedOptions().timeZone)
    .then(
      function (weatherObject) {
        //console.log(weatherObject)
        res.json(weatherObject)
      }
    )
})

