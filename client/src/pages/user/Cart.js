import React from 'react';
import { useSelector } from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import CartRow from '../../components/product/CartRow';

const Cart = () => {
  const { products } = useSelector((state) => state.store);

  const updateRequest = (id, reqQte) => {
    console.log({ id, reqQte });
  };

  return (
    <Container maxWidth='lg'>
      <Typography variant='h6' className='section-header' gutterBottom>
        User Cart
      </Typography>

      {products.length === 0 ? (
        <Typography className='text-center' variant='h5'>
          Your cart is empty
        </Typography>
      ) : (
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
            {products.map((product) => (
              <CartRow
                key={product._id}
                product={product}
                updateRequest={updateRequest}
              />
            ))}
          </TableBody>
        </Table>
      )}
    </Container>
  );
};

export default Cart;
