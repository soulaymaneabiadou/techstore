import React from 'react';
import { useSelector } from 'react-redux';
import {
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
} from '@material-ui/core';
import Orders from '../admin/Orders';
import DataCard from '../../components/DataCard';

const Dashboard = () => {
  const orderCount = useSelector((state) => state.orders.count);
  const { user } = useSelector((state) => state.auth);

  return (
    <Container maxWidth='lg'>
      <Grid container spacing={3} className='mt-2 mb-2'>
        <Grid item xs={12} md={3}>
          <DataCard main={user?.name?.split(' ')[0]} desc={user?.email} />
        </Grid>

        <Grid item xs={12} md={3}>
          <DataCard main={orderCount} desc='Total Orders' />
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant='h5'>Orders history</Typography>
            <Orders user={true} />
          </CardContent>
        </Card>
      </Grid>
    </Container>
  );
};

export default Dashboard;
