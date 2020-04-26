import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUsers } from '../../../actions/userActions';
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
  Link as MuiLink,
  makeStyles,
  Breadcrumbs,
  Typography
} from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    width: '100%'
  },
  container: {
    maxHeight: '100%'
  }
});

const Users = props => {
  const dispatch = useDispatch();
  const { all } = useSelector(state => state.users);
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  // eslint-disable-next-line
  const [columns, setColumns] = useState([
    { id: 'name', label: 'Name' },
    { id: 'email', label: 'Email' }
  ]);

  useEffect(() => {
    dispatch(getUsers());
    // eslint-disable-next-line
  }, []);

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

          <Typography color='textPrimary'>Users</Typography>
        </Breadcrumbs>
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
              {all
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(row => {
                  return (
                    <TableRow hover role='checkbox' tabIndex={-1} key={row._id}>
                      {columns.map(column => {
                        let value = row[column.id];
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
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component='div'
          count={all.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </Container>
  );
};

export default Users;
