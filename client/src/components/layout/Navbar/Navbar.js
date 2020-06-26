import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  makeStyles,
} from '@material-ui/core';
import { AccountCircle, MoreVert } from '@material-ui/icons';
import MainMenu from './Menu';
import MobileMenu from './MobileMenu';

const useStyles = makeStyles((theme) => ({
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

const Navbar = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const handleProfileMenuOpen = (event) => setAnchorEl(event.currentTarget);

  const handleMobileMenuClose = () => setMobileMoreAnchorEl(null);

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) =>
    setMobileMoreAnchorEl(event.currentTarget);

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const menuId = 'primary-search-account-menu';

  return (
    <div className='grow'>
      <AppBar position='static' className='navbar'>
        <div className='container'>
          <Toolbar>
            <Typography className='text-uppercase' variant='body1' noWrap>
              <Link to='/' className='text-white'>
                Tech Store
              </Link>
            </Typography>

            <div className='grow' />
            <div className={classes.sectionDesktop}>
              <Button color='inherit'>
                <Link to='/' className='text-white'>
                  Home
                </Link>
              </Button>
              <Button color='inherit'>
                <Link to='/shop' className='text-white mx-1'>
                  Shop
                </Link>
              </Button>
              <Button color='inherit'>
                <Link to='/about' className='text-white'>
                  About
                </Link>
              </Button>

              {isAuthenticated ? (
                user && user.role && user.role === 'user' ? (
                  <Button color='inherit'>
                    <Link to='/profile/cart' className='text-white mx-1'>
                      Cart
                    </Link>
                  </Button>
                ) : null
              ) : (
                <Button color='inherit'>
                  <Link to='/profile/cart' className='text-white mx-1'>
                    Cart
                  </Link>
                </Button>
              )}

              <IconButton
                edge='end'
                aria-label='account of current user'
                aria-controls={menuId}
                aria-haspopup='true'
                onClick={handleProfileMenuOpen}
                color='inherit'
              >
                <AccountCircle />
              </IconButton>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton
                aria-label='show more'
                aria-controls={mobileMenuId}
                aria-haspopup='true'
                onClick={handleMobileMenuOpen}
                color='inherit'
              >
                <MoreVert />
              </IconButton>
            </div>
          </Toolbar>
        </div>
      </AppBar>

      <MobileMenu
        mobileMenuId={mobileMenuId}
        mobileMoreAnchorEl={mobileMoreAnchorEl}
        isMobileMenuOpen={isMobileMenuOpen}
        handleMobileMenuClose={handleMobileMenuClose}
        handleProfileMenuOpen={handleProfileMenuOpen}
      />

      <MainMenu
        menuId={menuId}
        anchorEl={anchorEl}
        isMenuOpen={isMenuOpen}
        handleMenuClose={handleMenuClose}
      />
    </div>
  );
};

export default Navbar;
