const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  total_price: {
    type: Number
  },
  payment_id: {
    type: String,
    required: true
  },
  products: [
    {
      product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products'
      },
      unit_price: {
        type: Number,
        required: true
      },
      ordered_quantity: {
        type: Number,
        required: true
      }
    }
  ],
  shipping_address: {
    type: Object
  },
  status: {
    type: String,
    enum: ['created', 'paid', 'shipping', 'completed', 'cancelled'],
    default: 'created'
  }
});

OrderSchema.pre('save', function (next) {
  this.total_price = this.products.reduce(
    (acc, cv) => acc + cv.unit_price * cv.ordered_quantity,
    0
  );

  next();
});

/*
  OrderSchema.methods.confirmOrder = function () {
  // TODO: Confirm order IF paid(if payment success using a hook)
};
*/

module.exports = mongoose.model('Order', OrderSchema);
