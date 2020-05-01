import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, Container, Button, Link } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { setCurrent } from '../../actions/productActions';

const Landing = (props) => {
  const { products, loading } = useSelector((state) => state.store);
  const { name, description, images } = products[0] || {};
  const dispatch = useDispatch();

  const handleShowDetails = () => {
    products && dispatch(setCurrent(products[0]));
    props.history && props.history.push(`/shop/${name}`);
  };

  return (
    <div className='grow'>
      <header
        className='landing text-white'
        style={{
          backgroundImage: `url(${images && images[0]})`,
        }}
      >
        <div className='dark-overlay landing-inner flex-center'>
          <Container maxWidth='lg' className='relative-pos'>
            <div className='text-content'>
              {loading ? (
                <Skeleton
                  animation='wave'
                  variant='text'
                  width={'80%'}
                  className='heading'
                  height={40}
                />
              ) : (
                <Typography
                  className='text-white heading'
                  color='textPrimary'
                  gutterBottom={true}
                  variant='h5'
                >
                  {name}
                </Typography>
              )}

              {loading ? (
                <Skeleton
                  animation='wave'
                  variant='text'
                  width={'100%'}
                  height={160}
                  className='desc'
                />
              ) : (
                <Typography
                  className='text-white desc'
                  gutterBottom={true}
                  variant='body1'
                >
                  {description}
                </Typography>
              )}
            </div>

            <div className='flex-col hero-buttons'>
              <div className='mouse-icon'>
                <div className='wheel' />
              </div>
              {loading ? (
                <Skeleton
                  animation='wave'
                  variant='rect'
                  width={180}
                  height={60}
                  className='mb-2 mt-2'
                />
              ) : (
                <Button
                  color='primary'
                  variant='contained'
                  size='large'
                  fullWidth={false}
                  className='btn-large'
                  onClick={handleShowDetails}
                >
                  Add to cart
                </Button>
              )}
              {loading ? (
                <Skeleton
                  animation='wave'
                  variant='rect'
                  width={180}
                  height={40}
                />
              ) : (
                <Link
                  className='text-white text-underlined text-uppercase pointer'
                  onClick={handleShowDetails}
                >
                  Check it out
                </Link>
              )}
            </div>
          </Container>
        </div>
      </header>
    </div>
  );
};

export default Landing;
