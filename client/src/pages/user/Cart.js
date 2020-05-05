import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import CartTable from '../../components/CartTable';
import CartFooter from '../../components/CartFooter';

const Cart = () => {
  const { list } = useSelector((state) => state.cart);

  return (
    <Container maxWidth='lg'>
      <Typography variant='h6' className='section-header' gutterBottom>
        Shopping Cart
      </Typography>

      {list.length === 0 ? (
        <Typography className='text-center' variant='h5'>
          Your cart is empty
        </Typography>
      ) : (
        <Fragment>
          <CartTable data={list} />
          <CartFooter />
        </Fragment>
      )}
    </Container>
  );
};

export default Cart;
