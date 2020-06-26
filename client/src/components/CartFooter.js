import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

const CartFooter = () => {
  const { total } = useSelector((state) => state.cart);

  return (
    <Container maxWidth='lg' className='mt-3'>
      <Grid
        container
        spacing={6}
        className='bg-elevated bg-light rounded'
        justify='space-between'
        direction='row'
      >
        <Grid item md={4}>
          <Grid item xs={12} className='d-flex'>
            <Typography className='' variant='body1'>
              Subtotal
            </Typography>
            <Typography className='' variant='body1'>
              $ {total}
            </Typography>
          </Grid>
          <Grid item xs={12} className='d-flex my-1'>
            <Typography className='' variant='body1'>
              Taxes
            </Typography>
            <Typography className='' variant='body1'>
              $ {total / 10}{' '}
            </Typography>
          </Grid>

          <hr className='mb-2 mt-1' />

          <Grid item xs={12} className='d-flex'>
            <Typography className='' variant='h6'>
              Total
            </Typography>
            <Typography className='text-bold' variant='h6'>
              $ {total}
            </Typography>
          </Grid>
        </Grid>

        <Grid item md={4} className='ml-3'>
          <Grid item xs={12} className='align-center'>
            <Button
              variant='contained'
              color='default'
              size='large'
              className='mt-1'
              fullWidth
            >
              <Link to='/shop'>Continue Shopping</Link>
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant='contained'
              color='primary'
              size='large'
              className='mt-2'
              fullWidth
            >
              <Link to='/profile/cart/checkout'>
                <Grid container spacing={4}>
                  <Grid item xs={6}>
                    <Typography className='text-white'>Checkout</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography className='text-white'>$ {total}</Typography>
                  </Grid>
                </Grid>
              </Link>
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CartFooter;
