import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SnackAlert from '../components/Alert';
import { checkout } from '../actions/cartActions';
import { createPayment } from '../actions/paymentsActions';

const CheckoutForm = (props) => {
  const dispatch = useDispatch();
  const { total, shop, list, errors } = useSelector((state) => state.cart);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [address, setAddress] = useState({
    street: '',
    zip: '',
    city: '',
    country: ''
  });
  const { street, zip, city, country } = address;

  const [payment, setPayment] = useState({
    quantity: shop.reduce(
      (accumulator, currentValue) => accumulator + currentValue.quantity,
      0
    ),
    price: total * 100
  });

  const [res, setRes] = useState({ type: null, message: null });

  useEffect(() => {
    !isAuthenticated && props.history.push('/login');
  }, [isAuthenticated, props.history]);

  useEffect(() => {
    errors.length > 0 && setRes({ type: 'error', message: errors[0] });
  }, [errors]);

  const handleChange = (input) => (e) =>
    setAddress({ ...address, [input]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createPayment({ ...payment, product: list[0] }));
    // dispatch(checkout({ address, total, shop }));
  };

  return (
    <Grid container item xs={12} md={8} className='bg-gray checkout-form'>
      <SnackAlert type={res.type} data={[{ error: res.message }]} />

      <Typography className='section-header' variant='h5' gutterBottom>
        Checkout
      </Typography>

      <Grid item xs={12}>
        <form noValidate autoComplete='off' onSubmit={onSubmit}>
          <Grid item xs={12}>
            <TextField
              className='mt-1 text-white'
              label='Street address'
              onChange={handleChange('street')}
              defaultValue={street}
              margin='normal'
            />
            <TextField
              className='mt-1 ml-3 text-white'
              label='Zip code'
              onChange={handleChange('zip')}
              defaultValue={zip}
              margin='normal'
            />
          </Grid>

          <Grid item xs={12} className='mt-1'>
            <TextField
              className='mt-1 text-white'
              label='City'
              onChange={handleChange('city')}
              defaultValue={city}
              margin='normal'
            />
            <TextField
              className='mt-1 ml-3 text-white'
              label='Country'
              onChange={handleChange('country')}
              defaultValue={country}
              margin='normal'
            />
          </Grid>

          <Button
            type='submit'
            variant='contained'
            color='default'
            className='mt-2 bg-dark'
          >
            Pay $ {total} Now
          </Button>
        </form>
      </Grid>
    </Grid>
  );
};

export default CheckoutForm;
