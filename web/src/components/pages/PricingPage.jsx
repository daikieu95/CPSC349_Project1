import React, { Component } from "react";
import {
  Container,
  CardDeck,
  Card,
  ListGroup,
  Button,
  Accordion
} from "react-bootstrap";

export default class PricingPage extends Component {
  toRegistration = () => {
    this.props.history.push("/register");
  };

  render() {
    return (
      <main role="main">
        <Container className="text-center my-5">
          <h1>Pricing</h1>

          <CardDeck className="my-5">
            <Card>
              <Card.Header className="text-uppercase">Basic</Card.Header>
              <Card.Body>
                <h2 className="card-title">
                  <sup>$</sup>0 / year
                </h2>
                <ListGroup className="mt-5" variant="flush">
                  <ListGroup.Item>
                    Show case your four best projects.
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
              <Card.Footer>
                <Button variant="primary" onClick={this.toRegistration}>
                  Get started
                </Button>
              </Card.Footer>
            </Card>
            <Card>
              <Card.Header className="text-uppercase">Pro</Card.Header>
              <Card.Body>
                <h2 className="card-title">
                  <sup>$</sup>10 / year
                </h2>
                <ListGroup className="mt-5" variant="flush">
                  <ListGroup.Item>
                    Show case up to eight projects.
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Gives an easy way for others to download your resume.
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Gives an easy way for others to contact you.
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Remove Portfolio Creator branding.
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
              <Card.Footer>
                <Button variant="primary" onClick={this.toRegistration}>
                  Get started
                </Button>
              </Card.Footer>
            </Card>
          </CardDeck>
        </Container>

        <Container className="text-center my-5">
          <h2 className="my-5">Frequently Asked Questions</h2>
          <Accordion>
            <Card>
              <Card.Header className="p-0">
                <Accordion.Toggle
                  as={Button}
                  eventKey="0"
                  className="btn-block"
                  variant="link"
                >
                  Which plan is best for me?
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Assumenda, sequi a? Ipsum optio odio accusantium dolorem rerum
                  consequuntur. Temporibus nemo recusandae ipsum natus suscipit
                  velit rem, commodi iste? Saepe, qui.
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Card.Header className="p-0">
                <Accordion.Toggle
                  as={Button}
                  eventKey="1"
                  className="btn-block"
                  variant="link"
                >
                  How can I just give Money to the developers of this product?
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="1">
                <Card.Body>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Assumenda, sequi a? Ipsum optio odio accusantium dolorem rerum
                  consequuntur. Temporibus nemo recusandae ipsum natus suscipit
                  velit rem, commodi iste? Saepe, qui.
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Card.Header className="p-0">
                <Accordion.Toggle
                  as={Button}
                  eventKey="2"
                  className="btn-block"
                  variant="link"
                >
                  Can I pay more than $10 per year?
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="2">
                <Card.Body>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Assumenda, sequi a? Ipsum optio odio accusantium dolorem rerum
                  consequuntur. Temporibus nemo recusandae ipsum natus suscipit
                  velit rem, commodi iste? Saepe, qui.
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </Container>
      </main>
    );
  }
}
