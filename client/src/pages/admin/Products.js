import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  Container,
  Button,
  Link as MuiLink,
  Breadcrumbs,
  Typography
} from '@material-ui/core';
import {
  CreateOutlined as CreateIcon,
  DeleteOutlined as RemoveIcon
} from '@material-ui/icons';
import { getProducts, deleteProduct } from '../../actions/productActions';
import DataTable from '../../components/layout/DataTable';

const Products = (props) => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.shop);
  const [data, setData] = useState([]);
  const [columns] = useState([
    { id: 'name', label: 'Name' },
    { id: 'price', label: 'Price' },
    { id: 'quantity', label: 'Quantity' },
    { id: 'action', label: '' }
  ]);

  const goTo = (to) => (e) => {
    e.preventDefault();
    props.history.push(to);
  };

  const deleteThisProduct = (id) => () => dispatch(deleteProduct(id));

  useEffect(() => {
    dispatch(getProducts());

    products.map(
      (product) =>
        (product.action = (
          <div>
            <Button
              disableElevation
              onClick={null}
              variant='contained'
              color='secondary'>
              <Link
                to={`/admin/products/update/${product._id}`}
                className='reset'>
                <CreateIcon />
              </Link>
            </Button>
            <Button
              disableElevation
              className='ml-1'
              onClick={deleteThisProduct(product._id)}
              variant='contained'
              color='secondary'>
              <RemoveIcon />
            </Button>
          </div>
        ))
    );

    setData(products);
    // eslint-disable-next-line
  }, []);

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
          <Link to='/admin/products/add'>Add a Product</Link>
        </Button>
      </div>

      <DataTable headers={columns} data={data} />
    </Container>
  );
};

export default Products;
