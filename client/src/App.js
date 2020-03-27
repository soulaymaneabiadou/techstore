import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import setAuthToken from './utils/setAuthToken';
// Components
import Navbar from './components/layout/Navbar/Navbar';
// Global Pages
import NotFound from './components/pages/NotFound';
import About from './components/pages/About';
import Home from './components/pages/Home';
import Shop from './components/pages/Shop';
import ProductDetailed from './components/pages/ProductDetailed';
// Auth Pages
import Login from './components/auth/Login';
import Register from './components/auth/Register';
// User related
import Dashboard from './components/pages/Dashboard';
import Cart from './components/pages/user/Cart';
// Admin
import Products from './components/pages/admin/Products';
import AddProduct from './components/pages/admin/AddProduct';
// Styling
import { StylesProvider } from '@material-ui/core/styles';
import './App.css';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  return (
    <StylesProvider injectFirst>
      <Provider store={store}>
        <Router>
          <Fragment>
            <Navbar />
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/about' component={About} />
              <Route exact path='/shop' component={Shop} />
              <Route exact path='/shop/:name' component={ProductDetailed} />
              <Route exact path='/products' component={Products} />
              <Route exact path='/products/add' component={AddProduct} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/signup' component={Register} />
              <Route exact path='/profile' component={Dashboard} />
              <Route exact path='/profile/cart' component={Cart} />
              <Route component={NotFound} />
            </Switch>
          </Fragment>
        </Router>
      </Provider>
    </StylesProvider>
  );
};

export default App;
