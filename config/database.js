const mongoose = require('mongoose');
require('../models/User');
const Cars = require('../models/cars');
//TODO change database name
const dbName = 'rentaCar'
const connectionString = `mongodb://localhost:27017/${dbName}`;

module.exports = async (app) => {
    try {
        await mongoose.connect(connectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Database connected');

        mongoose.connection.on('error', (err) => {
            console.log('Database error!');
            console.log(error);
            ///simple cars data
            
        })
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}