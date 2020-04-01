const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products'
      },
      quantity: {
        type: Number
      }
    }
  ],
  delivery_info: {
    address: {
      country: {
        type: String
      },
      city: {
        type: String
      },
      street: {
        type: String
      },
      rest: {
        type: String
      }
    },
    phone: {
      type: String
    }
  },
  status: {
    type: String,
    enum: ['delivered', 'pending'],
    default: 'pending'
  }
});

module.exports = mongoose.model('Order', OrderSchema);
