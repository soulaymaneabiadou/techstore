import React, { useState, useEffect, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SnackAlert from '../layout/Alert';
import { checkout } from '../../actions/cartActions';

const CheckoutForm = (props) => {
  const dispatch = useDispatch();
  const { total, shop, list, errors } = useSelector((state) => state.cart);
  const [address, setAddress] = useState({
    street: '',
    zip: '',
    city: '',
    country: '',
  });
  const { street, zip, city, country } = address;

  const [payment] = useState({
    quantity: shop.reduce(
      (accumulator, currentValue) => accumulator + currentValue.quantity,
      0
    ),
    price: total * 100,
  });

  const [res, setRes] = useState({ type: null, message: null });

  useEffect(() => {
    errors.length > 0 && setRes({ type: 'error', message: errors[0] });
  }, [errors]);

  const handleChange = (input) => (e) => {
    setRes({ type: null, message: null });
    setAddress({ ...address, [input]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(checkout({ address, total, shop, payment, product: list[0] }));
  };

  return (
    <Fragment>
      <SnackAlert type={res.type} data={[{ error: res.message }]} />

      <Typography className='section-header' variant='h5' gutterBottom>
        Order details
      </Typography>

      <Grid item xs={12}>
        <form noValidate autoComplete='off' onSubmit={onSubmit}>
          <Grid item xs={12}>
            <TextField
              className='mt-1'
              label='Street address'
              onChange={handleChange('street')}
              defaultValue={street}
              margin='normal'
              fullWidth={true}
            />
            <TextField
              className='mt-1'
              label='Zip code'
              onChange={handleChange('zip')}
              defaultValue={zip}
              margin='normal'
              type='number'
              fullWidth={true}
            />

            <TextField
              className='mt-1'
              label='City'
              onChange={handleChange('city')}
              defaultValue={city}
              margin='normal'
              fullWidth={true}
            />
            <TextField
              className='mt-1'
              label='Country'
              onChange={handleChange('country')}
              defaultValue={country}
              margin='normal'
              fullWidth={true}
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
    </Fragment>
  );
};

export default CheckoutForm;
