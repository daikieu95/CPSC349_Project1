import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Nav,
  Tab,
  Badge,
  Button,
  Image
} from "react-bootstrap";
import domain from "images/domain.png";
import free from "images/free.png";
import linkshare from "images/linkshare.png";
import resume from "images/resume.png";
import contacts from "images/contacts.png";

export default class FeaturesPage extends Component {
  toPricing = () => {
    this.props.history.push("/pricing");
  };

  render() {
    return (
      <main role="main" id="features">
        <Container className="text-center my-5">
          <h1>Features</h1>
          <Tab.Container defaultActiveKey="first">
            <Row className="my-5 border border-info">
              <Col sm="4" className="px-0">
                <Nav variant="pills" className="flex-column">
                  <Nav.Item className="m-0">
                    <Nav.Link
                      eventKey="first"
                      className="d-flex justify-content-between"
                    >
                      Simple
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item className="m-0">
                    <Nav.Link
                      eventKey="second"
                      className="d-flex justify-content-between"
                    >
                      Professional
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item className="m-0">
                    <Nav.Link
                      eventKey="third"
                      className="d-flex justify-content-between"
                    >
                      One link to share
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item className="m-0">
                    <Nav.Link
                      eventKey="fourth"
                      className="d-flex justify-content-between"
                    >
                      Resume download
                      <Badge pill variant="warning">
                        Pro
                      </Badge>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item className="m-0">
                    <Nav.Link
                      eventKey="fifth"
                      className="d-flex justify-content-between"
                    >
                      Contact form
                      <Badge pill variant="warning">
                        Pro
                      </Badge>
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
              <Col sm="8" className="bg-info text-light py-4">
                <Tab.Content>
                  <Tab.Pane eventKey="first">
                    <h4 className="text-light">Simple</h4>
                    <p>
                      Easy for your audience to learn about you, simple for you
                      to set up.
                    </p>
                    <Image src={free} alt="free" fluid />
                  </Tab.Pane>
                  <Tab.Pane eventKey="second">
                    <h4 className="text-light">Professional</h4>
                    <p>Take control and centralize your online presence.</p>
                    <Image src={domain} alt="domain" fluid />
                  </Tab.Pane>
                  <Tab.Pane eventKey="third">
                    <h4 className="text-light">One link to share</h4>
                    <p>Use your link everywhere to promote yourself.</p>
                    <Image src={linkshare} alt="linkshare" fluid />
                  </Tab.Pane>
                  <Tab.Pane eventKey="fourth">
                    <h4 className="text-light">Resume download</h4>
                    <p>Download your resume in a second.</p>
                    <Image src={resume} alt="resume" fluid />
                  </Tab.Pane>
                  <Tab.Pane eventKey="fifth">
                    <h4 className="text-light">Contact form</h4>
                    <p>
                      Clients can contact you directly in your portfolio page
                    </p>
                    <Image src={contacts} alt="contacts" fluid />
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
          <Row className="my-5 py-5">
            <Col>
              <h3>Ready to unlock more features?</h3>
              <Button variant="info" onClick={this.toPricing}>
                Compare Plans
              </Button>
            </Col>
          </Row>
        </Container>
      </main>
    );
  }
}
