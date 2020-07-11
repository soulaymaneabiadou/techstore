import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const CheckoutDetails = () => {
  const { total } = useSelector((state) => state.cart);
  const orderCount = useSelector((state) => state.orders.count);

  return (
    <Fragment>
      <Grid item xs={12} className='mb-2'>
        <Typography className='details-header' variant='h5' gutterBottom>
          Order #{orderCount + 1}
        </Typography>
        <Typography variant='subtitle2' className='details-date mb-3'>
          {new Date().toLocaleDateString()}
        </Typography>

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
            $ {0}
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
    </Fragment>
  );
};

export default CheckoutDetails;
