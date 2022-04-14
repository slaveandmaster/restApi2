const { model, Schema , Types: { ObjectId }} = require('mongoose');
const Brand  = require('./brand');
const Type  = require('./type');


const carSchema = new Schema({
    model: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    year: { type: Number, required: true },
    brand: {type: ObjectId,required: true,ref: 'Brand'},
    type: {type: ObjectId,required: true,ref: 'Type'},
      numberOfSeats: {
        type: Number,
        min: 1,
        max: 255,
        default: 5
      },
      numberOfDoors: {
        type: Number,
        min: 1,
        max: 255,
        default: 4
      },
      transmission: {
        type: String,
        enum: ["Manual", "Automatic"],
        default: "Manual"
      },
      airConditioner: {
        type: Boolean,
        default: false
      },
      numberInStock: {
        type: String,
        required: true,
        min: 0,
        max: 255
      },
      RentalRate: {
        type: Number,
        default: 0,
        min: 0
      },
    isRented: {type: Boolean,default: false},
    isDeleted: {type: Boolean, default: false}    
}, {timestamps: true})

const Car = model('Car', carSchema);

module.exports = Car;