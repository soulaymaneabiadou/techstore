import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, Container, Button, Link } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { setCurrent } from '../../actions/productActions';
import { addToCart } from '../../actions/cartActions';
import SnackAlert from '../Alert';

const Landing = (props) => {
  const { products, loading } = useSelector((state) => state.store);
  const { name, description, images } = products[0] || {};
  const dispatch = useDispatch();
  const [res, setRes] = useState({ type: null, message: null });

  const handleShowDetails = () => {
    products && dispatch(setCurrent(products[0]));
    props.history && props.history.push(`/shop/${name}`);
  };

  const addCurrentToCart = () => {
    dispatch(addToCart(products[0]));
    setRes({
      type: 'success',
      message: `Product has been added to cart`
    });
  };

  if (loading) {
    return (
      <div className='landing dark-overlay landing-inner flex-center'>
        <Container maxWidth='lg'>
          <Skeleton animation='wave' variant='text' width={'60%'} height={80} />
          <Skeleton
            animation='wave'
            variant='text'
            width={'80%'}
            height={240}
          />
          <Skeleton
            animation='wave'
            variant='text'
            width={'40%'}
            height={120}
          />
        </Container>
      </div>
    );
  }

  return (
    <div className='grow'>
      <SnackAlert type={res.type} data={[{ error: res.message }]} />
      <header
        className='landing text-white'
        style={{
          backgroundImage: `url(${images && images[0]})`
        }}
      >
        <div className='dark-overlay landing-inner flex-center'>
          <Container maxWidth='lg' className='relative-pos'>
            <div className='text-content'>
              <Typography
                className='text-white heading'
                color='textPrimary'
                gutterBottom={true}
                variant='h5'
              >
                {name}
              </Typography>

              <Typography
                className='text-white desc'
                gutterBottom={true}
                variant='body1'
              >
                {description}
              </Typography>
            </div>

            <div className='flex-col hero-buttons'>
              <Button
                color='primary'
                variant='contained'
                size='large'
                fullWidth={false}
                className='btn-large'
                onClick={addCurrentToCart}
              >
                Add to cart
              </Button>

              <Link
                className='text-white text-underlined text-uppercase pointer'
                onClick={handleShowDetails}
              >
                Check it out
              </Link>
            </div>
          </Container>
        </div>
      </header>
    </div>
  );
};

export default Landing;
