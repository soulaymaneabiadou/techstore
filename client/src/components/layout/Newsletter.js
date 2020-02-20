import React from 'react';
import {
  Typography,
  Container,
  Button,
  TextField,
  Grid
} from '@material-ui/core';

const Newsletter = () => {
  return (
    <div className='grow'>
      <Container maxWidth='sm' className='pt-3 pb-2'>
        <Typography
          className='text-uppercase'
          align='left'
          color='textPrimary'
          gutterBottom={true}
          variant='h5'>
          NewsLetter
        </Typography>
        <Typography
          className='mb-2'
          align='left'
          color='textSecondary'
          gutterBottom={true}
          variant='subtitle2'>
          Subscribe and recieve latest updates and product deals, We promise we
          won't bother you; It is monthly only.
        </Typography>
        <form>
          <Grid container wrap='wrap' spacing={2}>
            <Grid item xs={12} sm={12} md={8} lg={8}>
              <TextField type='email' label='Email address' fullWidth={true} />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <Button
                className='mt-lg-1'
                type='submit'
                variant='contained'
                fullWidth
                color='secondary'>
                Subscribe
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </div>
  );
};

export default Newsletter;
