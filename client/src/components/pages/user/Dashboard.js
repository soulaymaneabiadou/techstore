import React from 'react';
import { Grid, Container } from '@material-ui/core';
import AccountProfile from './AccountProfile';

const Dashboard = () => {
  return (
    <div className='grow'>
      <Container maxWidth='lg' className='mt-3'>
        <Grid container spacing={4}>
          <Grid item lg={5} md={6} xl={5} xs={12}>
            <AccountProfile />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Dashboard;
