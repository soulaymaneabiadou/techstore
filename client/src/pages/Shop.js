import React, { useEffect, Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Typography, Grid, Container } from '@material-ui/core';
import ProductCard from '../components/product/ProductCard';
import Footer from '../components/layout/Footer';
import { getProducts } from '../actions/productActions';
import ProductCardSkeleton from '../components/product/ProductCardSkeleton';

const Shop = (props) => {
  const { products, loading } = useSelector((state) => state.store);
  const dispatch = useDispatch();
  let list = null;

  useEffect(() => {
    dispatch(getProducts());
    // eslint-disable-next-line
  }, []);

  if (loading) {
    list = (
      <Fragment>
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <ProductCardSkeleton />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <ProductCardSkeleton />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <ProductCardSkeleton />
        </Grid>
      </Fragment>
    );
  }

  return (
    <Container maxWidth='lg'>
      <Typography
        align='center'
        className='my-3 text-uppercase'
        color='textSecondary'
        gutterBottom={true}
        variant='h4'
      >
        Shop
      </Typography>

      <Grid container spacing={4}>
        {list
          ? list
          : products.map((product) => (
              <Grid item xs={12} sm={6} md={4} lg={4} key={product._id}>
                <ProductCard product={product} history={props.history} />
              </Grid>
            ))}
      </Grid>
      <Footer />
    </Container>
  );
};

export default Shop;
