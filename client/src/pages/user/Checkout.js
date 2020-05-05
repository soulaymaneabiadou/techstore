import React from 'react';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import CheckoutDetails from '../../components/CheckoutDetails';
import CheckoutForm from '../../components/CheckoutForm';

const Checkout = (props) => {
  return (
    <Container maxWidth='lg'>
      <Grid container spacing={3} className='checkout-base-bg mt-3'>
        <CheckoutForm history={props.history} />
        <CheckoutDetails />
      </Grid>
    </Container>
  );
};

export default Checkout;
