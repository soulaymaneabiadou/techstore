import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/DeleteForever';
import { updateCart, removeFromCart } from '../../actions/cartActions';

const CartRow = ({ product }) => {
  const dispatch = useDispatch();
  const { _id, name, images, price, quantity: availableQte } = product;
  const [quantity, setQunatity] = useState(1);

  const requestQuantity = (e) => {
    const { value } = e.target;
    if (value > 0 && value <= availableQte) {
      setQunatity(value);
      dispatch(updateCart(_id, value));
    }
  };

  const removeProduct = () => dispatch(removeFromCart(_id));

  return (
    <TableRow key={_id}>
      <TableCell className='cart-product-cell'>
        <img src={images[0]} alt='' className='img-cart rounded' />
        <Typography variant='h6' className='product-name' gutterBottom>
          {name}
        </Typography>
      </TableCell>
      <TableCell className='cart-cell'>$ {price} </TableCell>
      <TableCell className='cart-cell'>
        <TextField
          type='number'
          min={1}
          max={availableQte}
          value={quantity}
          onChange={requestQuantity}
          className='qte-number'
        />
      </TableCell>
      <TableCell className='cart-cell'>$ {quantity * price}</TableCell>
      <TableCell>
        <Button onClick={removeProduct}>
          <DeleteIcon />
        </Button>
      </TableCell>
    </TableRow>
  );
};

CartRow.propTypes = {
  product: PropTypes.object.isRequired,
};

CartRow.defaultProps = {
  product: {},
};

export default CartRow;
