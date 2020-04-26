import React, { useState, useEffect } from 'react';
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

const Cart = () => {
  const classes = useStyles();
  const [cart, setCart] = useState(
    localStorage.getItem('cart').split(',') || ''
  );

  const createData = (name, up, qtt, price) => {
    return { name, up, qtt, price };
  };

  const rows = [];

  cart.map((product) => rows.push(createData(product, 2, 1, 3)));

  return (
    <div className='grow'>
      <Container maxWidth='lg' className='mt-3'>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label='spanning table'>
            <TableHead>
              <TableRow>
                <TableCell>Product</TableCell>
                <TableCell align='left'>Unit Price</TableCell>
                <TableCell align='left'>Quantity</TableCell>
                <TableCell align='left'>Price</TableCell>
              </TableRow>
            </TableHead>
            
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.name}>
                  <TableCell component='th' scope='row'>
                    {row.name}
                  </TableCell>
                  <TableCell align='left'>{row.up}</TableCell>
                  <TableCell align='left'>{row.qtt}</TableCell>
                  <TableCell align='left'>{row.price}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
};

export default Cart;
