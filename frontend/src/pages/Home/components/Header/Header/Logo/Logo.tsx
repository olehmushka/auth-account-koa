import React, { FC } from 'react';
import image from '../../../../../../assets/logo.png';
import './style.scss';

const Logo: FC<{}> = () => (
  <img
    src={image}
    style={{ width: 30, height: 30 }}
  />
);

export default Logo;
