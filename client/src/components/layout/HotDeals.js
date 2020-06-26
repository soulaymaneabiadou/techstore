import React, { useState, useEffect, Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Typography, Grid, Container } from '@material-ui/core';
import ProductCard from '../product/ProductCard';
import ProductCardSkeleton from '../product/ProductCardSkeleton';

const HotDeals = (props) => {
  const { products, loading } = useSelector((state) => state.store);
  const [deals, setDeals] = useState([]);

  useEffect(() => {
    setDeals([products[0], products[1]]);
  }, [products]);

  return (
    <Container maxWidth='lg'>
      <Typography
        align='center'
        color='textPrimary'
        display='block'
        variant='h5'
        className='my-2 text-uppercase section-header'
      >
        Top Deals
      </Typography>

      <Grid container item md={8} spacing={2} className='deals-container'>
        {loading ? (
          <Fragment>
            <Grid item xs={12} sm={6}>
              <ProductCardSkeleton />
            </Grid>
            <Grid item xs={12} sm={6}>
              <ProductCardSkeleton />
            </Grid>
          </Fragment>
        ) : (
          deals.map((product, i) => (
            <Grid key={i} item xs={12} sm={6}>
              <ProductCard key={i} product={product} history={props.history} />
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
};

export default HotDeals;
