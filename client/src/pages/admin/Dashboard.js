import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Container, Typography, Grid } from '@material-ui/core';
import DataTable from '../../components/layout/DataTable';

const Dashboard = () => {
  const userCount = useSelector((state) => state.users.count);
  const orderCount = useSelector((state) => state.orders.count);
  const orders = useSelector((state) => state.orders.list);
  const productCount = useSelector((state) => state.store.count);

  const [columns] = useState([
    { id: '_id', label: 'id' },
    { id: 'date', label: 'Date' },
    { id: 'status', label: 'Status' },
  ]);

  return (
    <Container maxWidth='lg'>
      <Grid container>
        <Grid item xs={12} md={4}>
          <h1>User count {userCount}</h1>
        </Grid>
        <Grid item xs={12} md={4}>
          <h1>Order count {orderCount}</h1>
        </Grid>
        <Grid item xs={12} md={4}>
          <h1>Product count {productCount}</h1>
        </Grid>
      </Grid>

      <DataTable headers={columns} data={orders} />
    </Container>
  );
};

export default Dashboard;
