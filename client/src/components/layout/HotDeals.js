import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Typography, Grid, Container } from '@material-ui/core';
import ProductCard from '../product/ProductCard';

const HotDeals = (props) => {
  const { products } = useSelector((state) => state.store);
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

      <Grid container spacing={2}>
        {deals &&
          deals.length > 0 &&
          deals.map((product) => (
            <Grid item xs={12} sm={6} key={product?._id}>
              <ProductCard key={product?._id} product={product} history={props.history} />
            </Grid>
          ))}
      </Grid>
    </Container>
  );
};

export default HotDeals;
