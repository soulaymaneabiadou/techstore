import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

const SnackAlert = ({ type, errors }) => {
  const [open, setOpen] = useState(false);
  const [arr, setArr] = useState([])

  useEffect(() => {
    let tempArray = [];
    errors && errors.map(error => tempArray = error.error.split(','));
    setArr(tempArray);
    setOpen(!open);
  }, [errors]);

  const handleClose = () => setOpen(false);

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}>
      <div className='flex-col mt-3'>
        {arr &&
          arr.map(error => (
            // @ts-ignore
            <Alert key={Math.random()} className='my-1' severity={type}>
              {error}
            </Alert>
          ))}
      </div>
    </Snackbar>
  );
};

Alert.propTypes = {
  errors: PropTypes.array.isRequired,
  type: PropTypes.string.isRequired
};

Alert.defaultProps = {
  errors: [],
  type: ''
};

export default SnackAlert;
