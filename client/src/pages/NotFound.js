import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Container, Button } from '@material-ui/core';

const NotFound = () => {
  return (
    <Container maxWidth='sm' className='not-found pt-3'>
      <Typography
        color='textPrimary'
        gutterBottom
        variant='h5'
        className='section-header'
      >
        Oops!
      </Typography>

      <Typography color='textSecondary' gutterBottom variant='subtitle1'>
        The ressource you are looking for doesn't exist
      </Typography>

      <Button color='primary' variant='outlined'>
        <Link to='/'>Go back</Link>
      </Button>
    </Container>
  );
};

export default NotFound;
