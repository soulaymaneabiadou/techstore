import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Grid, Typography } from '@material-ui/core';
import ProfileCard from '../../components/ProfileCard';
import { getOrders } from '../../actions/orderActions'
import Orders from '../admin/Orders';
import LatestOrderCard from '../../components/LatestOrderCard';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { list } = useSelector(state => state.orders)

  useEffect(() => {
    dispatch(getOrders());

    console.log(list)
  }, [])

  return (
    <Container maxWidth='lg'>
      <Grid container spacing={4}>
        <Grid container item xs={12} sm={6}>
          <ProfileCard user={user && user} />
        </Grid>

        <Grid container item xs={12} sm={6}>
          <LatestOrderCard order={list[0]} />
        </Grid>
      </Grid>

      <Grid container>
        <Grid container item xs={12} className="mt-3">
          <Typography variant='h4' >Orders history</Typography>
          <Orders user={true} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
