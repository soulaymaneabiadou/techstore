import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Menu, MenuItem } from '@material-ui/core';

const MainMenu = ({ menuId, anchorEl, isMenuOpen, handleMenuClose }) => {
  const { isAuthenticated } = useSelector(state => state.auth);

  return (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}>
      {isAuthenticated ? (
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
        </div>
      ) : (
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
      )}
    </Menu>
  );
};

MainMenu.propTypes = {
  menuId: PropTypes.string.isRequired,
  anchorEl: PropTypes.object,
  isMenuOpen: PropTypes.bool.isRequired,
  handleMenuClose: PropTypes.func.isRequired
};

export default MainMenu;
