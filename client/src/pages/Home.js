import React, { useEffect, Fragment } from 'react';
import { useDispatch } from 'react-redux';
import Landing from '../components/layout/Landing';
import HotDeals from '../components/layout/Deals';
import Footer from '../components/layout/Footer';
import { getProducts } from '../actions/productActions';

const Home = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
    //eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      <Landing history={props.history} />
      <HotDeals history={props.history} />
      <Footer />
    </Fragment>
  );
};

export default Home;
