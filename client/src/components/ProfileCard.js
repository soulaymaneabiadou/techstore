import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography } from '@material-ui/core';

const ProfileCard = ({ user: { name, email } }) => {
  return (
    <Grid container className='bg-elevated bg-light mt-2 profile-card'>
      <Grid item xs={12} md={6} className='profile-info mb-1'>
        <Typography variant='h5' className='header'>
          {name}
        </Typography>
        <Typography variant='body2' className='subheader'>
          {email}
        </Typography>
      </Grid>
    </Grid>
  );
};

ProfileCard.defaultProps = {
  user: {
    name: '',
    email: '',
  },
};

ProfileCard.propTypes = {
  user: PropTypes.object.isRequired,
};

export default ProfileCard;
