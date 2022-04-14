const { model, Schema,Types: { ObjectId } } = require('mongoose');
const User = require('./User');
const Car = require('./cars');


const rentedCarSchema = new Schema({
    car: { type: ObjectId, required: true, ref: 'Car' },
    user: { type: ObjectId, required: true, ref: 'User' },
    names: {type: String, required:true},
    date: { type: String, required: true },
    days: { type: Number, required: true }, 
    total: {type: Number},
    isDeleted: {type: Boolean, default:false}
})

const RentedCarInfo = model('RentedCarInfo', rentedCarSchema);

module.exports = RentedCarInfo;