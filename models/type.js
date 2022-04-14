const { model, Schema } = require('mongoose');

const typeSchema = new Schema({
name: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 50
  }
})

const Type = model('Type', typeSchema);

module.exports = Type;
