const mongoose = require('mongoose');
const Cars = require('../models/cars')
mongoose.connect('mongodb://localhost:27017/rentaCar', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('mongo connection open');
}).catch((err) => console.log(error))
const cars = [{
    model: 'Opel', 
    image: 'noimage.jpeg',
    price: '70',
    year: '2010',
    type: "Combi",
    numberOfSeats: 4,
    numberOfDoors: 4,
    transmission: 'Manual', 
    airConditioner: true,
    numberInStock: 'EH1243KH',
    RentalRate: 1,
    isRented: true
      
  }, {
     model: 'Audi', 
    image: 'noimage.jpeg',
    price: '70',
    year: '2010',
    type: "Sedan",
    numberOfSeats: 4,
    numberOfDoors: 4,
    transmission: 'Manual', 
    airConditioner: true,
    numberInStock: 'EH1243KH',
    RentalRate: 1,
    isRented: true
  }, {
     model: 'VW', 
    image: 'noimage.jpeg',
    price: '70',
    year: '2010',
    type: "hatchback",
    numberOfSeats: 4,
    numberOfDoors: 4,
    transmission: 'Manual', 
    airConditioner: true,
    numberInStock: 'EH1243KH',
    RentalRate: 1,
    isRented: true
  }]
  const seedDb = async () => {
      await Cars.deleteMany({});
      await Cars.insertMany(cars)
  };
  seedDb().then(() => {
      mongoose.connection.close();
  })