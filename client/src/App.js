import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import setAuthToken from './utils/setAuthToken';
// Components
import Navbar from './components/layout/Navbar/Navbar';
// Global Pages
import NotFound from './pages/NotFound';
import About from './pages/About';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetailed from './pages/ProductDetailed';
// Auth Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
// User related
import Dashboard from './pages/Dashboard';
import Cart from './pages/user/Cart';
import Checkout from './pages/user/Checkout';
// Admin
import Users from './pages/admin/Users';
import Products from './pages/admin/Products';
import AddProduct from './pages/admin/AddProduct';
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
              <Route exact path='/admin/users' component={Users} />
              <Route exact path='/admin/products' component={Products} />
              <Route exact path='/admin/products/add' component={AddProduct} />
              <Route
                exact
                path='/admin/products/update/:id'
                component={AddProduct}
              />
              <Route exact path='/login' component={Login} />
              <Route exact path='/signup' component={Register} />
              <Route exact path='/profile' component={Dashboard} />
              <Route exact path='/profile/cart' component={Cart} />
              <Route exact path='/profile/cart/checkout' component={Checkout} />
              <Route component={NotFound} />
            </Switch>
          </Fragment>
        </Router>
      </Provider>
    </StylesProvider>
  );
};

export default App;
