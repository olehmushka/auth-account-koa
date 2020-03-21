import React from 'react';
import { Spinner } from 'reactstrap';
import './CustomSpinner.scss';

const CustomSpinner = () => (
  <div className="spinner">
    <Spinner size="lg" color="dark" />
  </div>
);

export default CustomSpinner;
