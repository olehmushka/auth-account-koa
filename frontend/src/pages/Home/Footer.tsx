import React from 'react';
import { gymURL } from '../../constants/variables';

const Footer = () => (
  <footer>
    <span className="ml-auto">
      <a href={gymURL} rel="noopener noreferrer" target="_blank">
        my web site
      </a>
    </span>
  </footer>
);

export default Footer;
