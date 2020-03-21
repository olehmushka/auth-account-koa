import React, { FC } from 'react';
import { ILoaderProps } from './types';
import CustomSpinner from './CustomSpinner';

const Loader: FC<ILoaderProps> = ({ loading, children }) => {
  return loading ? <CustomSpinner /> : children || null;
};

export default Loader;
