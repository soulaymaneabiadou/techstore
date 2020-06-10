import React from 'react';
import { Typography, Container } from '@material-ui/core';

const Shop = () => {
  return (
    <Container maxWidth='sm' className='pt-3'>
      <Typography
        align='center'
        className='my-2 text-uppercase'
        color='textSecondary'
        gutterBottom={true}
        variant='h4'>
        About
      </Typography>
      <Typography
        align='center'
        className='my-2 text-uppercase'
        color='textSecondary'
        gutterBottom={true}
        variant='body1'>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum, in
        nesciunt est amet ratione dolor distinctio, quaerat autem, consequuntur
        neque commodi totam placeat eum?
      </Typography>
    </Container>
  );
};

export default Shop;
