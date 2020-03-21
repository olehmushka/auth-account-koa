import React, { FC } from 'react';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';

const Header: FC<any> = () => (
  <Breadcrumb>
    <BreadcrumbItem active><a href="/home">Home</a></BreadcrumbItem>
  </Breadcrumb>
);

export default Header;
