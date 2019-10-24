import React, { Component } from "react";
import { Container } from "react-bootstrap";

export default class NotFoundPage extends Component {
  render() {
    return (
      <main role="main">
        <Container className="my-5 text-center">
          <h1>
            We are sorry but the content you were looking for was not found.
          </h1>
        </Container>
      </main>
    );
  }
}
