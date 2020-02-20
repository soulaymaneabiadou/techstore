import React, { useEffect, useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Typography, Button, Container } from '@material-ui/core';
import SnackAlert from '../Alert';
import { register } from '../../actions/authActions';

const Register = props => {
  const dispatch = useDispatch();
  const { isAuthenticated, errors } = useSelector(state => state.auth);
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: ''
  });
  const { name, email, password } = user;

  useEffect(() => {
    isAuthenticated && props.history.push('/profile');
  }, [isAuthenticated, props.history]);

  const handleChange = input => e =>
    setUser({ ...user, [input]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    dispatch(register({ name, email, password }));
  };

  return (
    <Fragment>
      <SnackAlert type='error' errors={errors} />
      <Container maxWidth='xs'>
        <form noValidate autoComplete='off' onSubmit={onSubmit}>
          <Typography
            variant='h4'
            align='center'
            className='text-uppercase mt-3'>
            Sign Up
          </Typography>
          <TextField
            className='mt-1'
            label='Full Name'
            onChange={handleChange('name')}
            defaultValue={name}
            margin='normal'
            fullWidth={true}
          />
          <TextField
            className='mt-1'
            label='Email'
            onChange={handleChange('email')}
            defaultValue={email}
            margin='normal'
            fullWidth={true}
          />
          <TextField
            className='mt-1'
            label='Password'
            onChange={handleChange('password')}
            defaultValue={password}
            margin='normal'
            fullWidth={true}
          />
          <Button
            type='submit'
            variant='contained'
            color='primary'
            className='mt-1'
            fullWidth>
            Sign Up
          </Button>
        </form>
      </Container>
    </Fragment>
  );
};

export default Register;
