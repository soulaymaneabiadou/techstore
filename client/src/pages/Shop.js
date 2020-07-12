import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, Grid, Container } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import ProductCard from '../components/product/ProductCard';
import Footer from '../components/layout/Footer';
import { getProducts } from '../actions/productActions';
import ProductCardSkeleton from '../components/product/ProductCardSkeleton';

const Shop = (props) => {
  const { products, loading, count } = useSelector((state) => state.store);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(2);
  let list = null;

  useEffect(() => {
    dispatch(getProducts());
    // eslint-disable-next-line
  }, []);

  const switchPages = (e, newPage) => setCurrentPage(newPage);

  const createSkeletons = (max = 6) => {
    let skeletons = new Array(max);
    for (let i = 0; i < max; i++) {
      skeletons.push(
        <Grid item key={i} xs={12} sm={6} md={4} lg={4}>
          <ProductCardSkeleton />
        </Grid>
      );
    }

    return skeletons;
  };

  if (loading) {
    list = (
      <Grid container spacing={4}>
        {createSkeletons()}
      </Grid>
    );
  }

  // Pagination stuff
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

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
          : currentProducts.map((product) => (
              <Grid item xs={12} sm={6} md={4} lg={4} key={product._id}>
                <ProductCard product={product} history={props.history} />
              </Grid>
            ))}
      </Grid>

      <div className='text-center'>
        <Pagination
          className='pagination'
          onChange={switchPages}
          count={Math.ceil(count / productsPerPage)}
        />
      </div>
      <Footer />
    </Container>
  );
};

export default Shop;
