import React from 'react';
import { Typography, Container } from '@material-ui/core';

const Shop = () => {
  return (
    <Container maxWidth='lg' className='pt-2'>
      <Typography
        className='text-uppercase section-header'
        gutterBottom={true}
        variant='h4'
      >
        About
      </Typography>
      <Typography gutterBottom={true} variant='body1'>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nostrum hic
        qui deleniti laborum. Blanditiis quod voluptatum quisquam! Laborum
        quibusdam inventore eligendi molestias impedit iste consequatur itaque
        ut, vel praesentium. Aliquid harum voluptas, suscipit aspernatur quaerat
        iste quibusdam, maxime eos doloremque repudiandae, ea nobis
        reprehenderit nam. Nulla illum nesciunt, eligendi repudiandae dolores
        eius.
      </Typography>
    </Container>
  );
};

export default Shop;
