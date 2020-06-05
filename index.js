const express = require('express')
const app = express()
const router = express.Router();
const bodyParser = require('body-parser');
global.models = require('./models');
global.Op = models.Sequelize.Op;
const port = process.env.PORT || 3200;
const env = process.env.NODE_ENV || 'development';

app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use ('/couriers', require(`${process.env.PWD}/routes/courier.js`))
app.use ('/vehicles', require(`${process.env.PWD}/routes/vehicle.js`))

app.listen(port, async function () {
  console.log(`[${env}] Couriers API running listening on port ${port}!`)
})
