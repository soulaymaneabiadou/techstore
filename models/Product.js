const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a product name']
  },
  description: {
    type: String,
    required: [true, 'Please add a description']
  },
  price: {
    type: Number,
    required: [true, 'Please add a price']
  },
  quantity: {
    type: Number,
    required: [true, 'Please add a quantity']
  },
  images: [
    {
      type: String,
      required: [true, 'Please include an image']
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

ProductSchema.path('images').validate(function(images) {
  if (!images) {
    return false;
  } else if (images.length === 0) {
    return false;
  }
  return true;
}, 'Product needs to have at least one image');

module.exports = mongoose.model('Product', ProductSchema);
