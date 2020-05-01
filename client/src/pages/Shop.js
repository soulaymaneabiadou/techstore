import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Typography, Grid, Container } from '@material-ui/core';
import ProductCard from '../components/product/ProductCard';
import Footer from '../components/layout/Footer';
import { getProducts } from '../actions/productActions';

const Shop = (props) => {
  const { products } = useSelector((state) => state.store);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, []);

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
        {products &&
          products.length > 0 &&
          products.map((product) => (
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
