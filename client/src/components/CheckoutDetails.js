import React from 'react';
import { useSelector } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const CheckoutDetails = () => {
  const { total } = useSelector((state) => state.cart);

  return (
    <Grid container item xs={12} md={4} className='bg-light checkout-details'>
      <Grid item xs={12} className='mb-2'>
        <Typography className='details-header' variant='h5' gutterBottom>
          Order #252
        </Typography>
        <Typography variant='subtitle2' className='details-date'>
          {new Date().toLocaleDateString()}
        </Typography>
      </Grid>
      <Grid item xs={12}>
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
    </Grid>
  );
};

export default CheckoutDetails;
