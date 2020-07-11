import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, Typography } from '@material-ui/core';

const DataCard = ({ main, desc }) => {
  return (
    <Card className=''>
      <CardContent>
        <Typography align='center' variant='h2'>
          {main}
        </Typography>
        <Typography align='center' variant='body1'>
          {desc}
        </Typography>
      </CardContent>
    </Card>
  );
};

DataCard.defaultProps = {
  main: '',
  desc: '',
};

DataCard.propTypes = {
  main: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  desc: PropTypes.string.isRequired,
};

export default DataCard;
