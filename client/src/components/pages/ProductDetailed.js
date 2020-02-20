import React, { useState, Fragment } from 'react';
import { useSelector } from 'react-redux';
import {
  Grid,
  Container,
  Typography,
  Button,
  Avatar,
  Tooltip
} from '@material-ui/core';
import { AvatarGroup } from '@material-ui/lab';

const ProductDetailed = () => {
  const { current } = useSelector(state => state.store);
  const { images, name, description } = current || {};
  const [featuredImg, setFeaturedImg] = useState(images && images[0].url);

  const setFeaturedImage = url => setFeaturedImg(url);

  return (
    current && (
      <Fragment>
        <Container maxWidth='lg'>
          <Grid container className='mt-2'>
            <Grid container item xs={12} sm={12} md={6} lg={6}>
              <img src={featuredImg} className='current-img' alt={name} />

              <AvatarGroup className='img-group'>
                {images &&
                  images.map(
                    (img, i) =>
                      i < 5 && (
                        <Avatar
                          key={i}
                          alt={img.name}
                          src={img.url}
                          className='pointer'
                          onClick={() => setFeaturedImage(img.url)}
                        />
                      )
                  )}
                {images && images.length > 5 && (
                  <Tooltip title=''>
                    <Avatar> {images.length - 5} </Avatar>
                  </Tooltip>
                )}
              </AvatarGroup>
            </Grid>
            <Grid
              container
              item
              direction='column'
              xs={12}
              md={6}
              lg={6}
              className='mt-4 mt-lg-2 pl-lg-2'>
              <Typography color='textPrimary' gutterBottom={true} variant='h4'>
                {name}
              </Typography>
              <Typography
                color='textSecondary'
                gutterBottom={true}
                variant='body1'>
                {description}
              </Typography>
              <Button
                variant='contained'
                color='primary'
                className='center mt-1'>
                Buy
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Fragment>
    )
  );
};

export default ProductDetailed;
