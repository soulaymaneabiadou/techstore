import React from 'react';
import { Container, Grid } from '@material-ui/core';
import ProfileCard from '../../components/ProfileCard';

const Dashboard = () => {
  return (
    <Container maxWidth='lg'>
      <Grid container spacing={4}>
        <Grid container item xs={12} sm={6}>
          <ProfileCard
            user={{
              name: 'Jane Smith',
              email: 'janesmith@gmail.com',
            }}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
