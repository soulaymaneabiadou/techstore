import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUsers } from '../../actions/userActions';
import {
  Container,
  Link as MuiLink,
  Breadcrumbs,
  Typography,
} from '@material-ui/core';
import DataTable from '../../components/layout/DataTable';

const Users = (props) => {
  const dispatch = useDispatch();
  const { all } = useSelector((state) => state.users);
  const [columns] = useState([
    { id: 'name', label: 'Name' },
    { id: 'email', label: 'Email' },
  ]);

  useEffect(() => {
    dispatch(getUsers());
    // eslint-disable-next-line
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

          <Typography color='textPrimary'>Users</Typography>
        </Breadcrumbs>
      </div>

      <DataTable headers={columns} data={all} />
    </Container>
  );
};

export default Users;
