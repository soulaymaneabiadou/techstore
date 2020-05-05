import React, { useEffect, useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  TextField,
  Typography,
  Button,
  Container,
  Grid,
} from '@material-ui/core';
import SnackAlert from '../../components/Alert';
import { login } from '../../actions/authActions';

const Login = (props) => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const { email, password } = user;

  useEffect(() => {
    isAuthenticated && props.history.push('/profile');
  }, [isAuthenticated, props.history]);

  const handleChange = (input) => (e) =>
    setUser({ ...user, [input]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  return (
    <Fragment>
      <SnackAlert type='error' />
      <Container maxWidth='xs'>
        <Typography
          variant='h4'
          align='center'
          className='text-uppercase mt-3 section-header'
        >
          Login
        </Typography>

        <Grid container item>
          <form noValidate autoComplete='off' onSubmit={onSubmit}>
            <TextField
              className='mt-1'
              label='Email'
              onChange={handleChange('email')}
              defaultValue={email}
              margin='normal'
              fullWidth
            />
            <TextField
              type='password'
              className='mt-1'
              label='Password'
              onChange={handleChange('password')}
              defaultValue={password}
              margin='normal'
              fullWidth
            />
            <Button
              type='submit'
              variant='contained'
              color='default'
              className='mt-2 bg-dark'
            >
              Login
            </Button>
          </form>
        </Grid>

        <div className='deviding-ruler horizontal'>
          <span className='devider-text'>OR</span>
        </div>

        <Grid container item>
          <Button
            type='submit'
            variant='contained'
            color='primary'
            className='mt-1'
            fullWidth
          >
            Login as a guest
          </Button>
          <Button
            type='submit'
            variant='contained'
            color='default'
            className='mt-2'
            fullWidth
          >
            Login as an admin
          </Button>
        </Grid>
      </Container>
    </Fragment>
  );
};

export default Login;
