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

const getHouses = (req, res) => {
  const { city, type, minPrice, maxPrice } = req.query;
  const houses = data.filter(house => {
    let matchCity = true;
    let matchType = true;
    let matchPrice = false;
    if(city){
      house.Ciudad === city ? matchCity = true : matchCity = false;
    }
    if(type){
      house.Tipo === type ? matchType = true : matchType = false;
    }

    let housePrice = house.Precio.slice(1);
    housePrice = housePrice.split(',').join('');
    housePrice = parseInt(housePrice);

    if(housePrice >= parseInt(minPrice) && housePrice <= parseInt(maxPrice)) {
      matchPrice = true
    }
    return matchCity && matchType && matchPrice;
  });
  res.json(houses);
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
app.get('/getHouses', getHouses)
app.get('/getMetaData', getMetaData);

module.exports = app;