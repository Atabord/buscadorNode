const express = require('express');
const app = express();
const data = require('./data.json');


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH');
  next();
});

const getAll = (req, res) => {
  res.json(data);
}

const getMetaData = (req, res) => {
  const houses = data.reduce((total, current) => {
    return {
      cities: [...total.cities, current.Ciudad],
      types: [...total.types, current.Tipo],
    };
  }, { cities: [], types: []});
  
  houses.cities = [...new Set(houses.cities)];
  houses.types = [...new Set(houses.types)];
  
  res.json(houses);
}

app.get('/getAll', getAll);
app.get('/getMetaData', getMetaData);

module.exports = app;