const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  total_price: {
    type: Number,
  },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products',
      },
      unit_price: {
        type: Number,
      },
      orderd_quantity: {
        type: Number,
      },
    },
  ],
  shipping_address: {
    type: Object,
  },
  status: {
    type: String,
    enum: ['created', 'paid', 'shipping', 'completed', 'cancelled'],
    default: 'created',
  },
});

OrderSchema.pre('save', function (next) {
  this.total = this.products.reduce(
    (acc, currentValue) => acc + currentValue.price * currentValue.quantity,
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
