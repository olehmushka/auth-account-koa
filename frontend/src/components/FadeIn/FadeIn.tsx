import React, { FC } from 'react';
import { IProps } from './types';

const FadeIn: FC<IProps> = ({ children }) => (
  <div className="animated fadeIn">{children}</div>
);

export default FadeIn;
