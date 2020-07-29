import React, { useEffect, useState, Fragment } from 'react';
import { useSelector } from 'react-redux';
import { CardElement, useElements } from '@stripe/react-stripe-js';
import { Typography, TextField, Button } from '@material-ui/core';
import SnackAlert from '../layout/Alert';

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: '#333333',
      fontFamily: '"Montserrat", sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '16px',
      '::placeholder': {
        color: '#cccccc'
      }
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a'
    }
  }
};

const CheckoutForm = ({ success }) => {
  const elements = useElements();
  const { name } = useSelector((state) => state.auth.user);
  const { total, errors } = useSelector((state) => state.cart);
  const { stripe, paymentIntent } = useSelector((state) => state.payments);
  const [error, setError] = useState(null);
  const [res, setRes] = useState({ type: null, message: null });
  const [address, setAddress] = useState({
    line1: '',
    postal_code: '',
    city: '',
    country: ''
  });
  const { line1, postal_code, city, country } = address;

  const handleChange = (input) => (e) => {
    setRes({ type: null, message: null });
    setAddress({ ...address, [input]: e.target.value });
  };

  const handleCardChange = (e) => {
    if (e.error) {
      setError(e.error.message);
    } else {
      setError(null);
    }
  };

  const submitPayment = async (e) => {
    e.preventDefault();

    if (!line1 || !postal_code || !city || !country) {
      return setRes({ type: 'error', message: 'Fill all' });
    }

    const card = elements.getElement(CardElement);
    const res = await stripe.handleCardPayment(
      paymentIntent.client_secret,
      card,
      {
        shipping: { name, address }
      }
    );

    if (!res.error && res.paymentIntent) {
      success();
    }
  };

  useEffect(() => {
    errors.length > 0 && setRes({ type: 'error', message: errors[0] });
  }, [errors]);

  return (
    <Fragment>
      <SnackAlert type={res.type} data={[{ error: res.message }]} />

      <Typography className='section-header' variant='h4' gutterBottom>
        Order chekout
      </Typography>

      <form onSubmit={submitPayment}>
        <TextField
          className='mt-1'
          label='Street'
          onChange={handleChange('line1')}
          defaultValue={line1}
          margin='normal'
          fullWidth={true}
        />
        <TextField
          className='mt-1'
          label='Postal code'
          onChange={handleChange('postal_code')}
          defaultValue={postal_code}
          margin='normal'
          type='number'
          min={0}
          max={999999}
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

        <CardElement
          className='mt-3'
          id='card-element'
          options={CARD_ELEMENT_OPTIONS}
          onChange={handleCardChange}
          // onReady
        />
        <div className='mt-1'>
          <Typography variant='body2'>{error}</Typography>
        </div>

        <Button
          type='submit'
          variant='contained'
          color='default'
          className='mt-2 bg-dark'>
          Pay $ {total} Now
        </Button>
      </form>
    </Fragment>
  );
};

export default CheckoutForm;
