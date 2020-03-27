import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableContainer,
  TablePagination,
  TableRow,
  Container,
  Button,
  Link as MuiLink,
  makeStyles,
  Breadcrumbs,
  Typography
} from '@material-ui/core';
import { Create as CreateIcon, Remove as RemoveIcon } from '@material-ui/icons';

const useStyles = makeStyles({
  root: {
    width: '100%'
  },
  container: {
    maxHeight: '100%'
  }
});

const Products = props => {
  const { products } = useSelector(state => state.store);
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [columns, setColumns] = useState([
    { id: 'name', label: 'Name' },
    { id: 'description', label: 'Description' },
    { id: 'price', label: 'Price' },
    { id: 'quantity', label: 'Quantity' },
    { id: 'actions', label: 'Actions' }
  ]);

  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value));
    setPage(0);
  };

  const goTo = to => e => {
    e.preventDefault();
    props.history.push(to);
  };

  return (
    <Container maxWidth='lg' className=''>
      <div className='d-flex mb-2 admin-header'>
        <Breadcrumbs aria-label='breadcrumb'>
          <MuiLink color='inherit' href='/profile' onClick={goTo('/profile')}>
            Dashboard
          </MuiLink>

          <Typography color='textPrimary'>Products</Typography>
        </Breadcrumbs>

        <Button variant='contained' color='default'>
          <Link to='/products/add'>Add a Product</Link>
        </Button>
      </div>
      <Paper className={classes.root}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label='sticky table' className='mt-2'>
            <TableHead>
              <TableRow>
                {columns.map(column => (
                  <TableCell key={column.id}>{column.label}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {products
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(row => {
                  return (
                    <TableRow
                      hover
                      role='checkbox'
                      tabIndex={-1}
                      key={row.code}>
                      {columns.map(column => {
                        let value = row[column.id];

                        if (value == undefined) {
                          value = (
                            <div>
                              <Button
                                className='mr-1'
                                type='contained'
                                color='default'>
                                <Link to='products/modify/:id'>
                                  <CreateIcon />
                                </Link>
                              </Button>
                              <Button
                                onClick={null}
                                type='contained'
                                color='danger'>
                                <RemoveIcon />
                              </Button>
                            </div>
                          );
                        }
                        return (
                          <TableCell key={column._id} align={column.align}>
                            {value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component='div'
          count={products.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </Container>
  );
};

export default Products;
