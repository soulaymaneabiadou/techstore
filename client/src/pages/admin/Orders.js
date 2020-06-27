import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {
  Container,
  Link as MuiLink,
  Breadcrumbs,
  Typography
} from '@material-ui/core';
import { getOrders } from '../../actions/orderActions';
import DataTable from '../../components/layout/DataTable';

const Orders = (props) => {
  const dispatch = useDispatch();
  const list = useSelector(state => state.orders.list);
  const [columns] = useState([
    { id: '_id', label: 'id' },
    { id: 'date', label: 'Date' },
    { id: 'status', label: 'Status' },
  ]);

  useEffect(() => {
    dispatch(getOrders());
  }, []);

  const goTo = to => e => {
    e.preventDefault();
    props.history.push(to);
  };

  return (
    <Container maxWidth='lg'>
      {!props.user && <div className='d-flex mb-2 admin-header'>
        <Breadcrumbs aria-label='breadcrumb'>
          <MuiLink color='inherit' href='/profile' onClick={goTo('/profile')}>
            Dashboard
          </MuiLink>

          <Typography color='textPrimary'>Orders</Typography>
        </Breadcrumbs>
      </div>}

      <DataTable headers={columns} data={list} />
    </Container>
  )
}

export default Orders
