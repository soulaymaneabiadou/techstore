import React, { useEffect, Fragment } from 'react';
import { useDispatch } from 'react-redux';
import Landing from '../layout/Landing';
import Newsletter from '../layout/Newsletter';
import Footer from '../layout/Footer';
import { loadUser } from '../../actions/authActions';
import { getProducts } from '../../actions/productActions';

const Home = props => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
    dispatch(loadUser());
    //eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      <Landing history={props.history} />
      <Newsletter />
      <Footer />
    </Fragment>
  );
};

export default Home;
