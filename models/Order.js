const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  total: {
    type: Number,
  },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products',
      },
      price: {
        type: Number,
      },
      quantity: {
        type: Number,
      },
    },
  ],
  address: {
    country: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    street: {
      type: String,
      required: true,
    },
    zip: {
      type: String,
      required: true,
    },
  },
  status: {
    type: String,
    enum: ['delivered', 'pending'],
    default: 'pending',
  },
});

OrderSchema.pre('save', function (next) {
  this.total = this.products.reduce(
    (acc, currentValue) => acc + currentValue.price * currentValue.quantity,
    0
  );

  next();
});

module.exports = mongoose.model('Order', OrderSchema);
