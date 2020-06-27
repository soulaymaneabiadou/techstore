import React from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import CartRow from './CartRow';

const CartTable = ({ data }) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell className='cart-header'>Product</TableCell>
          <TableCell className='cart-header'>Price</TableCell>
          <TableCell className='cart-header'>Quantity</TableCell>
          <TableCell className='cart-header'>Total</TableCell>
          <TableCell className='cart-header'></TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {data.map((product) => (
          <CartRow key={product._id} product={product} />
        ))}
      </TableBody>
    </Table>
  );
};

CartTable.propTypes = {
  data: PropTypes.array.isRequired,
};

export default CartTable;
