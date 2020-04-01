const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const fileUpload = require('express-fileupload');
const errorHandler = require('./middleware/error');
const connectDB = require('./config/db');

dotenv.config({ path: './config/config.env' });

connectDB();

const app = express();

app.use(express.json());
app.use(fileUpload());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/v1/auth', require('./routes/auth'));
app.use('/api/v1/users', require('./routes/users'));
app.use('/api/v1/products', require('./routes/products'));
app.use('/api/v1/orders', require('./routes/orders'));

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

process.on('unhandledRejection', (err, promise) => {
  console.log(err);
  process.exit(1);
});
