import React, { useEffect, useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Typography, Button, Container } from '@material-ui/core';
import SnackAlert from '../../components/Alert';
import { createProduct, updateProduct } from '../../actions/productActions';

const AddProduct = (props) => {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { errors, products } = useSelector((state) => state.store);
  const [productToUpdate] = useState(props.match.params.id || null);
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    quantity: '',
    images: [],
  });

  useEffect(() => {
    if (productToUpdate) {
      setProduct(
        products.filter((product) => product._id === productToUpdate)[0]
      );
    }
    // eslint-disable-next-line
  }, [productToUpdate]);

  useEffect(() => {
    !isAuthenticated && props.history.push('/login');
    user && user.role !== 'admin' && props.history.push('/');
  }, [isAuthenticated, props.history, user]);

  const handleChange = (input) => (e) =>
    setProduct({ ...product, [input]: e.target.value });

  const uploadImage = (e) => {
    setProduct({ ...product, images: e.target.files });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(
      productToUpdate
        ? updateProduct(productToUpdate, product)
        : createProduct(product)
    );
  };

  const { name, description, price, quantity } = product;
  return (
    <Fragment>
      <SnackAlert type='error' errors={errors} />
      <Container maxWidth='sm'>
        <form noValidate autoComplete='off' onSubmit={onSubmit}>
          <Typography
            variant='h4'
            align='center'
            className='text-uppercase mt-3'
          >
            Add Product
          </Typography>

          <TextField
            className='mt-3'
            label='Product name'
            onChange={handleChange('name')}
            value={name}
            margin='normal'
            fullWidth={true}
          />
          <TextField
            className='mt-1'
            label='Product description'
            onChange={handleChange('description')}
            value={description}
            multiline="true"
            margin='normal'
            fullWidth={true}
          />
          <TextField
            type='number'
            className='mt-1'
            label='Product price'
            onChange={handleChange('price')}
            value={price}
            margin='normal'
            fullWidth={true}
          />
          <TextField
            type='number'
            className='mt-1'
            label='Product quantity'
            onChange={handleChange('quantity')}
            value={quantity}
            margin='normal'
            fullWidth={true}
          />
          <div className='upload-btn-wrapper'>
            <button className='btn'>Add images</button>
            <input type='file' multiple name='image' onChange={uploadImage} />
          </div>

          <Button
            type='submit'
            variant='contained'
            color='primary'
            className='mt-1'
            fullWidth
          >
            {productToUpdate ? 'Update' : 'Add'}
          </Button>
        </form>
      </Container>
    </Fragment>
  );
};

export default AddProduct;
