import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

const SnackAlert = ({ type, data }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (type && data) setOpen(true);
  }, [data, type]);

  const handleClose = () => setOpen(false);

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
    >
      <div className='flex-col mt-3'>
        {data &&
          data.map((error) => (
            <Alert key={Math.random()} className='my-1' severity={type}>
              {error.error}
            </Alert>
          ))}
      </div>
    </Snackbar>
  );
};

Alert.propTypes = {
  data: PropTypes.oneOf([Array, null]),
  type: PropTypes.string,
};

Alert.defaultProps = {
  data: null,
  type: '',
};

export default SnackAlert;
