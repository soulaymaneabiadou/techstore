import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Container } from '@material-ui/core';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../../components/checkout/CheckoutForm';
import { stripeLoading, getPaymentIntent } from '../../actions/paymentActions';

const Checkout = (props) => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { total, products } = useSelector((state) => state.cart);
  const { stripe } = useSelector((state) => state.payments);

  useEffect(() => {
    dispatch(stripeLoading());
    dispatch(getPaymentIntent(total, { products }));
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    !isAuthenticated && props.history.push('/login');
    total < 1 && props.history.push('/profile/cart');
  }, [isAuthenticated, props.history, total]);

  return (
    <Container maxWidth='lg'>
      <Grid container className='mt-3'>
        <Grid item xs={12} md={7}>
          <Elements stripe={stripe}>
            <CheckoutForm success={() => props.history.push('/profile')} />
          </Elements>
        </Grid>
        <Grid item xs={12} md={5}>
          <h2>List</h2>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Checkout;
