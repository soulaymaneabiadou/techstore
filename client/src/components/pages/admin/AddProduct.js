import React, { useEffect, useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  TextField,
  Typography,
  Button,
  Container,
  LinearProgress
} from '@material-ui/core';
import SnackAlert from '../../Alert';
import { createProduct } from '../../../actions/productActions';

const AddProduct = props => {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector(state => state.auth);
  const { error, uploading } = useSelector(state => state.store);
  const [fileName, setFileName] = useState('Select an image');
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: 0,
    quantity: 0,
    images: []
  });
  const { name, description, price, quantity } = product;

  useEffect(() => {
    !isAuthenticated && props.history.push('/login');
    user && user.role !== 'admin' && props.history.push('/');
  }, [isAuthenticated, props.history, user]);

  useEffect(() => {
    uploading >= 100 && props.history.push('/profile');
    // eslint-disable-next-line
  }, [uploading])

  const handleChange = input => e =>
    setProduct({ ...product, [input]: e.target.value });

  const uploadImage = e => {
    setProduct({ ...product, images: [...product.images, e.target.files[0]] });
    setFileName('File selected');
  };

  const onSubmit = e => {
    e.preventDefault();
    dispatch(createProduct(product));
  };

  return (
    <Fragment>
      <SnackAlert type='error' errors={error} />
      <Container maxWidth='xs'>
        <form noValidate autoComplete='off' onSubmit={onSubmit}>
          <Typography
            variant='h4'
            align='center'
            className='text-uppercase mt-3'>
            Add Product
          </Typography>

          {uploading && (
            <LinearProgress
              className='mt-2'
              variant='determinate'
              value={uploading}
            />
          )}

          <TextField
            className='mt-1'
            label='Product name'
            onChange={handleChange('name')}
            defaultValue={name}
            margin='normal'
            fullWidth={true}
          />
          <TextField
            className='mt-1'
            label='Product description'
            onChange={handleChange('description')}
            defaultValue={description}
            margin='normal'
            fullWidth={true}
          />
          <TextField
            type='number'
            className='mt-1'
            label='Product price'
            onChange={handleChange('price')}
            defaultValue={price}
            margin='normal'
            fullWidth={true}
          />
          <TextField
            type='number'
            className='mt-1'
            label='Product quantity'
            onChange={handleChange('quantity')}
            defaultValue={quantity}
            margin='normal'
            fullWidth={true}
          />
          <div className='upload-btn-wrapper'>
            <button className='btn'>{fileName}</button>
            <input type='file' name='image' onChange={uploadImage} />
          </div>

          <Button
            type='submit'
            variant='contained'
            color='primary'
            className='mt-1'
            fullWidth>
            Add
          </Button>
        </form>
      </Container>
    </Fragment>
  );
};

export default AddProduct;
