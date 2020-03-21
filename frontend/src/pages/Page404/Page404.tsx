import React, { FC } from 'react';
import { Col, Container, Row } from 'reactstrap';

const Page404: FC<{}> = () => (
  <div className="app flex-row align-items-center">
    <Container>
      <Row className="justify-content-center">
        <Col md="6">
          <div className="clearfix">
            <h1 className="float-left display-3 mr-4">The page you are looking for was not found.</h1>
          </div>
        </Col>
      </Row>
    </Container>
  </div>
);

export default Page404;
