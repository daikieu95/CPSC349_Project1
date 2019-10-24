import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button, Jumbotron, Image } from "react-bootstrap";
import domain from "images/domain.png";
import free from "images/free.png";
import linkshare from "images/linkshare.png";

export default class HomePage extends Component {
  toRegistration = () => {
    this.props.history.push("/register");
  };

  render() {
    return (
      <React.Fragment>
        <header className="bg-dark text-light">
          <Container className="py-5 bg">
            <Row className="py-5">
              <Col md="6" className="mx-auto text-center">
                <h2 className="text-light">Show the world what you can do.</h2>
                <p className="mb-4">
                  Create a page to showcase your projects, show everyone who you
                  are and let them know what you do.
                </p>
                <Button variant="info" block onClick={this.toRegistration}>
                  Create your portfolio
                </Button>
              </Col>
            </Row>
          </Container>
        </header>

        <main role="main">
          <Container>
            <Row className="py-5">
              <Col md="4">
                <h3 className="text-center">Simple</h3>
                <p>
                  Easy for your audience to learn about you, simple for you to
                  set up.
                </p>
                <Image src={free} alt="free" fluid />
              </Col>
              <Col md="4">
                <h3 className="text-center">Professional</h3>
                <p>Take control and centralize your online presence.</p>
                <Image src={domain} alt="domain" fluid />
              </Col>
              <Col md="4">
                <h3 className="text-center">One Link To Share</h3>
                <p>Use your link everywhere to promote yourself.</p>
                <Image src={linkshare} alt="linkshare" fluid />
              </Col>
            </Row>
            <Row className="mb-5">
              <Col className="text-center">
                <Link to="/features">See all features &rarr;</Link>
              </Col>
            </Row>
          </Container>

          <Jumbotron className="bg-info mb-0">
            <Container className="py-5">
              <Row>
                <Col md="6" className="mx-auto">
                  <h2 className="text-center text-uppercase text-light">
                    Build your portfolio now
                  </h2>
                  <Button
                    variant="secondary"
                    block
                    onClick={this.toRegistration}
                  >
                    Create your portfolio
                  </Button>
                </Col>
              </Row>
            </Container>
          </Jumbotron>
        </main>
      </React.Fragment>
    );
  }
}
