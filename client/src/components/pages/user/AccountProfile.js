import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Grid,
  TextField,
  Card,
  CardHeader,
  CardActions,
  CardContent,
  Divider,
  Button
} from '@material-ui/core';

const AccountProfile = () => {
  const [user, setUser] = useState(useSelector(state => state.auth.user));

  const handleChange = input => e =>
    setUser({ ...user, [input]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    console.log(user);
  };

  return (
    user && (
      <Card>
        <form autoComplete='off' noValidate>
          <CardHeader
            title='Profile'
            subheader='The information can be edited'
          />
          <Divider />
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  className='mt-1'
                  label='Full Name'
                  onChange={handleChange('name')}
                  defaultValue={user.name}
                  margin='normal'
                  fullWidth={true}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  className='mt-1'
                  label='Email'
                  onChange={handleChange('email')}
                  defaultValue={user.email}
                  margin='normal'
                  fullWidth={true}
                />
              </Grid>
            </Grid>
          </CardContent>
          <Divider />
          <CardActions>
            <Button color='primary' variant='contained' onClick={onSubmit}>
              Save details
            </Button>
          </CardActions>
        </form>
      </Card>
    )
  );
};

export default AccountProfile;
