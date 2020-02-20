import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, Container, Button } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { setCurrent } from '../../actions/productActions';

const Landing = props => {
  const { products, loading } = useSelector(state => state.store);
  const { _id, name, description, images } =
    products && products[0] ? products[0] : {};

  const dispatch = useDispatch();

  const handleShowDetails = () => {
    products && dispatch(setCurrent(products[0]));
    props.history && props.history.push(`/shop/${_id}`);
  };

  return (
    <div className='grow'>
      <header
        className='landing text-white'
        style={{
          backgroundImage: `url(${images && images[0]?.url})`
        }}>
        <div className='dark-overlay landing-inner flex-center'>
          <Container maxWidth='sm' className='flex-center'>
            {loading ? (
              <Skeleton
                animation='wave'
                variant='text'
                width={'60%'}
                height={64}
              />
            ) : (
              <Typography
                className='text-white'
                color='textPrimary'
                gutterBottom={true}
                variant='h4'>
                {name}
              </Typography>
            )}
            {loading ? (
              <Skeleton
                animation='wave'
                variant='text'
                width={'90%'}
                height={120}
              />
            ) : (
              <Typography
                className='text-white'
                color='textSecondary'
                gutterBottom={true}
                variant='subtitle1'>
                {description.substring(0, 30)}
              </Typography>
            )}
            {loading ? (
              <Skeleton
                animation='wave'
                variant='rect'
                width={140}
                height={80}
                className='center'
              />
            ) : (
              <Button
                color='primary'
                variant='contained'
                size='large'
                fullWidth={false}
                className='mt-3 btn-large center'
                onClick={handleShowDetails}>
                Check it
              </Button>
            )}
          </Container>
        </div>
      </header>
    </div>
  );
};

export default Landing;
