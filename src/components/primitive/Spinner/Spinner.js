import React from 'react';
import AlignLayout from '../../layouts/AlignLayout/AlignLayout';
import { CircularProgress } from '@material-ui/core';

const Spinner = ({ align, size }) => {
  return (
    <AlignLayout align={align}>
      <CircularProgress size={size} />
    </AlignLayout>
  );
};

Spinner.defaultProps = {
  align: 'center',
  size: 40
};

export default Spinner;
