import React from 'react';
import { Grid, Container } from '@material-ui/core';
import AccountProfile from './AccountProfile';

const UserDashboard = () => {
  return (
    <div className='grow'>
      <Container maxWidth='lg' className='mt-3'>
        <Grid container spacing={4}>
          <Grid item lg={4} md={6} xl={4} xs={12}>
            <AccountProfile />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default UserDashboard;
