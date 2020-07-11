import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography } from '@material-ui/core';

const LatestOrderCard = ({ order }) => {
  return (
    order && (
      <Grid container className='bg-elevated mt-2 profile-card'>
        <Grid item xs={12} md={6} className='profile-info mb-1'>
          <Typography variant='h5' className='mb-1'>
            Latest Order
          </Typography>
          <Typography variant='body1'>
            <b>Date:</b> {order.date}
          </Typography>
          <Typography variant='body1'>
            <b>Status:</b> {order.status}
          </Typography>
        </Grid>
      </Grid>
    )
  );
};

LatestOrderCard.defaultProps = {
  order: {},
};

LatestOrderCard.propTypes = {
  order: PropTypes.object,
};

export default LatestOrderCard;
