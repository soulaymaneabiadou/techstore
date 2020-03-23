const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name']
  },
  
  createdAt: {
    type: Date,
    default: Date.now
  }
});


module.exports = mongoose.model('Product', ProductSchema);
