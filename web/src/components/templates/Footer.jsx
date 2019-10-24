import React, { Component } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Jumbotron, Row, Col, Nav } from "react-bootstrap";

export default class Footer extends Component {
  render() {
    return (
      <footer>
        <Jumbotron className="mb-0">
          <Row>
            <Col md="3" className="mb-4 mb-md-0 text-center">
              Portfolio Center
            </Col>
            <Col md="3" className="text-center text-md-left mb-4 mb-md-0">
              <h6 className="border-bottom pb-2">Product</h6>
              <Nav className="flex-column">
                <LinkContainer exact to="/features">
                  <Nav.Link>Features</Nav.Link>
                </LinkContainer>
                <LinkContainer exact to="/pricing">
                  <Nav.Link>Pricing</Nav.Link>
                </LinkContainer>
              </Nav>
            </Col>
            <Col md="3" className="text-center text-md-left mb-4 mb-md-0">
              <h6 className="border-bottom pt-md-0 py-2">Company</h6>
              <Nav className="flex-column">
                <LinkContainer exact to="/contact">
                  <Nav.Link>Contact Us</Nav.Link>
                </LinkContainer>
              </Nav>
            </Col>
            <Col md="3" className="text-center text-md-right">
              &copy; 2019 Burden United
            </Col>
          </Row>
        </Jumbotron>
      </footer>
    );
  }
}
