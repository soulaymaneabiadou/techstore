import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Container,
  Button,
  Link as MuiLink,
  Breadcrumbs,
  Typography,
  Checkbox
} from '@material-ui/core';
import { getOrders } from '../../actions/orderActions';

const Orders = (props) => {
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(null);
  const list = useSelector(state => state.orders.list);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [columns] = useState([
    { id: '_id', label: 'id' },
    { id: 'date', label: 'Date' },
    { id: 'user', label: 'Client' },
    { id: 'status', label: 'Status' },
    // { id: '', label: '' }
  ]);

  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value));
    setPage(0);
  };

  useEffect(() => {
    dispatch(getOrders());
  }, []);

  const goTo = (to) => (e) => {
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

          <Typography color='textPrimary'>Orders</Typography>
        </Breadcrumbs>
      </div>

      <Table className='mt-2'>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.id}>{column.label}</TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {list
            ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row) => {
              return (
                <TableRow hover role='checkbox' tabIndex={-1} key={row._id}>
                  {columns.map((column) => {
                    let value = (column.id === 'user' && typeof column.id === "object") ? row[column.id].name : row[column.id];
                    if (column.id === 'date') {
                      value = new Date(row[column.id]).toLocaleString()
                    }

                    if (value === undefined) {
                      value = (
                        <Checkbox
                          // checked
                          // onChange
                          inputProps={{ 'aria-label': 'primary checkbox' }}
                        />
                      );
                    }
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
        </TableBody>
      </Table>

      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component='div'
        count={list.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Container>
  )
}

export default Orders
