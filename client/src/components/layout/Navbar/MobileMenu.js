import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Menu, MenuItem } from '@material-ui/core';

const MobileMenu = ({
  mobileMenuId,
  mobileMoreAnchorEl,
  isMobileMenuOpen,
  handleMobileMenuClose,
  handleProfileMenuOpen
}) => {
  return (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}>
      <MenuItem onClick={handleMobileMenuClose}>
        <Link to='/' className='mx-1'>
          Home
        </Link>
      </MenuItem>
      <MenuItem onClick={handleMobileMenuClose}>
        <Link to='/shop' className='mx-1'>
          Shop
        </Link>
      </MenuItem>
      <MenuItem onClick={handleMobileMenuClose}>
        <Link to='/about' className='mx-1'>
          About
        </Link>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <span className='mx-1'>Profile</span>
      </MenuItem>
    </Menu>
  );
};

MobileMenu.propTypes = {
  mobileMenuId: PropTypes.string.isRequired,
  mobileMoreAnchorEl: PropTypes.object,
  isMobileMenuOpen: PropTypes.bool.isRequired,
  handleProfileMenuOpen: PropTypes.func.isRequired,
  handleMobileMenuClose: PropTypes.func.isRequired
};

export default MobileMenu;
