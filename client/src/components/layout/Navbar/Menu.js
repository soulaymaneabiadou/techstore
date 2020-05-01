import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Menu, MenuItem } from '@material-ui/core';
import { logout } from '../../../actions/authActions';

const MainMenu = props => {
  const { menuId, anchorEl, isMenuOpen, handleMenuClose } = props;
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector(state => state.auth);

  const logoutUser = async () => {
    dispatch(logout());
    props.history.push('/login');
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
        <Link className='text-dark' to='/profile/cart'>
          My Cart
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
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}>
      {isAuthenticated
        ? user && user.role === 'admin'
          ? adminMenu
          : userMenu
        : guestMenu}
    </Menu>
  );
};

MainMenu.propTypes = {
  menuId: PropTypes.string.isRequired,
  anchorEl: PropTypes.object,
  isMenuOpen: PropTypes.bool.isRequired,
  handleMenuClose: PropTypes.func.isRequired
};

export default withRouter(MainMenu);
