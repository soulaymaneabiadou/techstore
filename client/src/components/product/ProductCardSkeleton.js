import React from 'react';
import { Skeleton } from '@material-ui/lab';
import Grid from '@material-ui/core/Grid';

const ProductCardSkeleton = () => {
  return (
    <div style={{margin: '-11rem 0 -8rem 0'}}>
      <Skeleton
        animation='wave'
        variant='text'
        width={'100%'}
        height={746}
        style={{ borderRadius: '16px' }}
      >
        <Skeleton
          animation='wave'
          variant='rect'
          width={'100%'}
          height={420}
          style={{ borderRadius: '16px' }}
        />

        <Skeleton
          animation='wave'
          variant='text'
          width={'80%'}
          height={96}
          style={{ top: '20px', marginLeft: '27px' }}
        />
        <Grid className='flex-row px-2'>
          <Skeleton
            animation='wave'
            variant='text'
            width={100}
            height={140}
            style={{ top: '50px' }}
          />

          <Skeleton
            animation='wave'
            variant='circle'
            width={56}
            height={88}
            className='mt-2'
            style={{ top: '50px' }}
          />
        </Grid>
      </Skeleton>
    </div>
  );
};

export default ProductCardSkeleton;
