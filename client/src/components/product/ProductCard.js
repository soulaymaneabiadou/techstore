import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  CardActionArea,
  IconButton,
  Typography,
  makeStyles
} from '@material-ui/core';
import { FavoriteBorder, AddShoppingCart } from '@material-ui/icons';
import { setCurrent } from '../../actions/productActions';

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 345
  },
  media: {
    height: 0,
    paddingTop: '56.25%' // 16:9
  }
}));

const ProductCard = props => {
  const { _id, name, images } = props.product;
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleShowDetails = () => {
    dispatch(setCurrent(props.product));
    props.history && props.history.push(`/shop/${_id}`);
  };

  return (
    <Card className={classes.card}>
      <CardActionArea onClick={handleShowDetails}>
        <CardMedia className={classes.media} image={images[0]?.url} />
        <CardContent>
          <Typography variant='h6' color='textPrimary' component='h1'>
            {name}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className='flex-end'>
        <IconButton aria-label='add to cart'>
          <AddShoppingCart />
          <FavoriteBorder />
        </IconButton>
      </CardActions>
    </Card>
  );
};

ProductCard.propTypes = {
  product: PropTypes.object.isRequired
};

ProductCard.defaultProps = {
  product: {}
};

export default ProductCard;
