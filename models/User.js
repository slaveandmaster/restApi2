const { Schema, model, Types: {ObjectId} } = require('mongoose');
const Rent = require('./rent');

//TODO change user model according to exam description
//TODO add validation
const userSchema = new Schema({
    email: {type: String, required: true},
    isAdmin: {type: Boolean, default: false},
    hashedPassword: {type: String, required:true},
    rented: {type: [ObjectId], ref: 'Rent'}
})

userSchema.index({email: 1}, {
    unique: true,
    collation: {
        locale: 'en',
        strength: 2
    }
})

const User = model('User', userSchema);

module.exports = User;