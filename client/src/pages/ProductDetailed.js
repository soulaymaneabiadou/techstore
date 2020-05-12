import React, { useState, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Grid,
  Container,
  Typography,
  Avatar,
  IconButton,
} from '@material-ui/core';
import { AvatarGroup } from '@material-ui/lab';
import { AddShoppingCart } from '@material-ui/icons';
import Footer from '../components/layout/Footer';
import SnackAlert from '../components/Alert';
import { addToCart } from '../actions/cartActions';

const ProductDetailed = () => {
  const dispatch = useDispatch();
  const { current = {} } = useSelector((state) => state.store);
  const { images, name, description } = current;
  const [featuredImg, setFeaturedImg] = useState(images[0]);
  const [res, setRes] = useState({ type: null, message: null });

  const setFeaturedImage = (url) => setFeaturedImg(url);

  const addProduct = () => {
    dispatch(addToCart(current));
    setRes({ type: 'success', message: `${name} has been added to cart` });
  };

  return (
    <Fragment>
      <Container maxWidth='lg'>
        <SnackAlert type={res.type} data={[{ error: res.message }]} />

        <Grid container className='mt-2'>
          <Grid container className='top-info'>
            <Grid container item xs={12} className='img-showcase'>
              <img src={featuredImg} className='current-img' alt={name} />

              <AvatarGroup className='img-group'>
                {images &&
                  images.map(
                    (img, i) =>
                      i < 5 && (
                        <Avatar
                          key={i}
                          alt={name}
                          src={img}
                          className='pointer img-group-item'
                          onClick={() => setFeaturedImage(img)}
                        />
                      )
                  )}
              </AvatarGroup>
            </Grid>
            <Grid container item direction='row' className='side-info'>
              <Typography
                color='textPrimary'
                gutterBottom={true}
                variant='h4'
                className='name'
              >
                {name}
              </Typography>

              <IconButton
                className='btn-rounded bg-dark'
                aria-label='add_to_cart'
                onClick={addProduct}
              >
                <AddShoppingCart />{' '}
                <span className='btn-text'>Add to cart</span>
              </IconButton>
            </Grid>
          </Grid>

          <Grid container item direction='row' className='desc-container'>
            <Typography
              color='textPrimary'
              gutterBottom={true}
              variant='h4'
              className='desc-header'
            >
              Description
            </Typography>
            <Typography
              color='textPrimary'
              gutterBottom={true}
              variant='body1'
              className='desc-body'
            >
              {description}
            </Typography>
          </Grid>
        </Grid>
      </Container>

      <Footer />
    </Fragment>
  );
};

export default ProductDetailed;
