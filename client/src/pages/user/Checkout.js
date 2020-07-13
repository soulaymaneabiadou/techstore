import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Container, Grid } from '@material-ui/core';
import CheckoutDetails from '../../components/checkout/CheckoutDetails';
import CheckoutForm from '../../components/checkout/CheckoutForm';

const Checkout = (props) => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    !isAuthenticated && props.history.push('/login');
  }, [isAuthenticated, props.history]);

  return (
    <Container maxWidth='lg'>
      <Grid container spacing={3} className='mt-3'>
        <Grid container item xs={12} md={8} className='checkout-form'>
          <CheckoutForm />
        </Grid>

        <Grid container item xs={12} md={4} className='checkout-details'>
          <CheckoutDetails />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Checkout;
