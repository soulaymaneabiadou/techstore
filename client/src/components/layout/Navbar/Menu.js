import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Menu, MenuItem } from '@material-ui/core';
import SnackAlert from '../../Alert';
import { logout } from '../../../actions/authActions';

const MainMenu = (props) => {
  const { menuId, anchorEl, isMenuOpen, handleMenuClose } = props;
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [res, setRes] = useState({ type: null, message: null });

  const logoutUser = () => {
    dispatch(logout());
    props.history.push('/login');
    setRes({ type: 'success', message: 'Logout successful' });
    setRes({ type: null, message: null });
  };

  // eslint-disable-next-line
  const [adminMenu, setAdminMenu] = useState(
    <div>
      <MenuItem onClick={handleMenuClose}>
        <Link className='text-dark' to='/profile'>
          Dashboard
        </Link>
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <Link className='text-dark' to='/admin/products'>
          Manage Products
        </Link>
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <Link className='text-dark' to='/admin/orders'>
          Manage Orders
        </Link>
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <Link className='text-dark' to='/admin/users'>
          Manage Users
        </Link>
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <Link className='text-dark' to='' onClick={logoutUser}>
          Logout
        </Link>
      </MenuItem>
    </div>
  );
  // eslint-disable-next-line
  const [userMenu, setUserMenu] = useState(
    <div>
      <MenuItem onClick={handleMenuClose}>
        <Link className='text-dark' to='/profile'>
          Dashboard
        </Link>
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <Link className='text-dark' to='' onClick={logoutUser}>
          Logout
        </Link>
      </MenuItem>
    </div>
  );
  // eslint-disable-next-line
  const [guestMenu, setGuestMenu] = useState(
    <div>
      <MenuItem onClick={handleMenuClose}>
        <Link className='text-dark' to='/login'>
          Login
        </Link>
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <Link className='text-dark' to='/signup'>
          Sign up
        </Link>
      </MenuItem>
    </div>
  );

  return (
    <Fragment>
      <SnackAlert type={res.type} data={[{ error: res.message }]} />
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id={menuId}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        {isAuthenticated
          ? user && user.role === 'admin'
            ? adminMenu
            : userMenu
          : guestMenu}
      </Menu>
    </Fragment>
  );
};

MainMenu.propTypes = {
  menuId: PropTypes.string.isRequired,
  anchorEl: PropTypes.object,
  isMenuOpen: PropTypes.bool.isRequired,
  handleMenuClose: PropTypes.func.isRequired,
};

export default withRouter(MainMenu);
