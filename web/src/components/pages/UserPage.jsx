import React, { Component } from "react";
import axios from "axios";
import { apiUrl } from "config.json";
import { Container, Row, Col, Image, Button } from "react-bootstrap";

export default class UserPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      status: "looking",
      user: null,
      image: "",
      content: ""
    };
  }

  componentDidMount() {
    const {
      match: {
        params: { user }
      }
    } = this.props;

    axios
      .get(apiUrl + "/user/get.php", {
        params: {
          link: user
        }
      })
      .then(response => {
        if (response.status === 200) {
          const imageUrl = apiUrl + response.data.image;

          this.setState({
            status: "found",
            user: response.data,
            image: imageUrl,
            content: response.data.summary
          });
        } else {
          this.setState({ status: "not found" });
        }
      })
      .catch(error => {
        this.setState({ status: "not found" });
      });
  }

  toRegistration = () => {
    this.props.history.push("/register");
  };

  render() {
    const { status, user, image, content } = this.state;

    if (status === "found") {
      return (
        <React.Fragment>
          <Container fluid className="p-0 m-0 min-vh-100">
            <Row className="p-0 m-0">
              <Col md="8" className="p-0 m-0">
                <Image
                  src={image}
                  className="w-100 max-vh-30 vh-md-100 sticky-top"
                />
              </Col>
              <Col className="py-4">
                <Row>
                  <Col>
                    <h1 className="text-center">{user.fullName}</h1>
                  </Col>
                </Row>
                <Row className="mb-2">
                  {user.projects.map(project => (
                    <Col key={project.id} xs="3">
                      <Image src={`${apiUrl}${project.image}`} fluid />
                    </Col>
                  ))}
                </Row>
                <Row>
                  <Col>{content}</Col>
                </Row>
                <Row>
                  <Col className="text-center">
                    <a
                      href="https://facebook.com"
                      target="new"
                      className="fa fa-facebook"
                    >
                      &nbsp;
                    </a>
                    <a
                      href="https://twitter.com"
                      target="new"
                      className="fa fa-twitter"
                    >
                      &nbsp;
                    </a>
                    <a
                      href="https://linkedin.com"
                      target="new"
                      className="fa fa-linkedin"
                    >
                      &nbsp;
                    </a>
                    <a
                      href="https://youtube.com"
                      target="new"
                      className="fa fa-youtube"
                    >
                      &nbsp;
                    </a>
                    <a
                      href="https://instagram.com"
                      target="new"
                      className="fa fa-instagram"
                    >
                      &nbsp;
                    </a>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
          {user.pro === "0" && (
            <footer className="footer mt-auto py-3 text-center bg-light">
              <Container>
                <h6>Powered by Portfolio Center.</h6>
                <p>Create your portfolio, show the world what you can do.</p>
                <Button onClick={this.toRegistration}>Get started</Button>
              </Container>
            </footer>
          )}
        </React.Fragment>
      );
    } else if (status === "looking") {
      return (
        <React.Fragment>
          <div className="wv-100 vh-100 d-flex justify-content-center align-items-center">
            <Container>
              <h1 className="text-center">Loading...</h1>
            </Container>
          </div>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <div className="wv-100 vh-100 d-flex justify-content-center align-items-center text-center">
            <Container>
              <h1>User not found.</h1>
              <p>Create your portfolio, show the world what you can do.</p>
              <Button onClick={this.toRegistration}>Get started</Button>
            </Container>
          </div>
        </React.Fragment>
      );
    }
  }
}
