import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  CardActionArea,
  Typography,
  IconButton,
} from '@material-ui/core';
import { AddShoppingCart } from '@material-ui/icons';
import { setCurrent } from '../../actions/productActions';
import { addToCart } from '../../actions/cartActions';

const ProductCard = ({ product, history }) => {
  const dispatch = useDispatch();
  const { name, images, price } = product;

  const handleShowDetails = () => {
    dispatch(setCurrent(product));
    history && history.push(`/shop/${name}`);
  };

  const addProduct = () => dispatch(addToCart(product));

  return (
    <Card className='product-card'>
      <CardActionArea onClick={handleShowDetails}>
        <CardMedia className='media' image={images ? images[0] : ' '} />
      </CardActionArea>

      <CardContent className='content'>
        <Typography
          variant='h6'
          color='textPrimary'
          component='h1'
          className='name'
        >
          {name}
        </Typography>
      </CardContent>

      <CardActions className='ads'>
        <Typography variant='body1' color='textPrimary' className='price'>
          $ {price}
        </Typography>
        <IconButton
          className='btn-rounded bg-gray'
          aria-label='add_to_cart'
          onClick={addProduct}
        >
          <AddShoppingCart />
        </IconButton>
      </CardActions>
    </Card>
  );
};

ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
};

ProductCard.defaultProps = {
  product: {},
};

export default ProductCard;
