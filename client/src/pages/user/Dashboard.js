import React from 'react';
import { useSelector } from 'react-redux';
import { Container, Grid } from '@material-ui/core';
import ProfileCard from '../../components/ProfileCard';

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <Container maxWidth='lg'>
      <Grid container spacing={4}>
        <Grid container item xs={12} sm={6}>
          <ProfileCard user={user && user} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
