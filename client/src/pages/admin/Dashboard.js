import React from 'react';
import { useSelector } from 'react-redux';
import { Container, Grid } from '@material-ui/core';
import DataCard from '../../components/DataCard';

const Dashboard = () => {
  const userCount = useSelector((state) => state.users.count);
  const orderCount = useSelector((state) => state.orders.count);
  const productCount = useSelector((state) => state.store.count);

  return (
    <Container maxWidth='lg'>
      <Grid container spacing={3} className='mt-2 mb-2'>
        <Grid item xs={12} md={3}>
          <DataCard main={userCount} desc='Users' />
        </Grid>

        <Grid item xs={12} md={3}>
          <DataCard main={orderCount} desc='Orders' />
        </Grid>

        <Grid item xs={12} md={3}>
          <DataCard main={productCount} desc='Products' />
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <h1>Temp</h1>
      </Grid>
    </Container>
  );
};

export default Dashboard;
