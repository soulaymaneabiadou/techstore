import React from 'react';
import { useSelector } from 'react-redux';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  content: {
    flex: '1 0 auto',
  },
}));

export default function MediaControlCard() {
  const classes = useStyles();
  const { user } = useSelector((state) => state.auth) || {};

  return (
    <Card className='root'>
      <div>
        <CardContent className={classes.content}>
          <Typography component='h5' variant='h5'>
            {user.name}
          </Typography>
          <Typography variant='subtitle1' color='textSecondary'>
            {user.email}
          </Typography>
        </CardContent>
      </div>
    </Card>
  );
}
