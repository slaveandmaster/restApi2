const { model, Schema } = require('mongoose');

const brandSchema = new Schema({
name: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 50
  },
})

const Brand = model('Brand', brandSchema);

module.exports = Brand;
