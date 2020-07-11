import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography } from '@material-ui/core';

const ProfileCard = ({ user }) => {
  return (
    user && (
      <Grid container className='bg-elevated mt-2 profile-card'>
        <Grid item xs={12} md={6} className='profile-info mb-1'>
          <Typography variant='h5' className='header'>
            {user.name}
          </Typography>
          <Typography variant='body2' className='subheader'>
            {user.email}
          </Typography>
        </Grid>
      </Grid>
    )
  );
};

ProfileCard.defaultProps = {
  user: {},
};

ProfileCard.propTypes = {
  user: PropTypes.object,
};

export default ProfileCard;
