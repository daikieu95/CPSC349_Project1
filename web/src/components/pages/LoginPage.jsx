import React, { Component } from "react";
import axios from "axios";
import { apiUrl } from "config.json";
import { getCurrentUser, login } from "services/auth";
import { Link } from "react-router-dom";
import {
  Container,
  Card,
  Form,
  Row,
  Col,
  Button,
  Spinner
} from "react-bootstrap";

export default class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      validated: false,
      checking: false,
      error: "",
      email: "",
      password: ""
    };
  }

  componentDidMount() {
    if (getCurrentUser()) {
      this.props.history.push("/account");
    }
  }

  isValid(form) {
    const data = new FormData(form);
    const email = data.get("email");
    const password = data.get("password");

    let valid = true;

    form[0].setCustomValidity("Invalid");

    if (!email) {
      this.setState({ email: "Please enter a your email." });
      valid = false;
    } else {
      if (!/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email)) {
        this.setState({ email: "Please enter a valid email." });
        valid = false;
      } else {
        form[0].setCustomValidity("");
      }
    }

    form[1].setCustomValidity("Invalid");

    if (!password) {
      this.setState({ password: "Please enter a password." });
      valid = false;
    } else {
      if (
        !/[A-Z]/.test(password) ||
        !/[a-z]/.test(password) ||
        !/[0-9]/.test(password) ||
        !/[^a-zA-Z\d]/.test(password) ||
        password.length < 8
      ) {
        this.setState({
          password: "Your password must contain at least eight characters."
        });
        valid = false;
      } else {
        form[1].setCustomValidity("");
      }
    }

    this.setState({ validated: true });

    return valid;
  }

  handleSubmit = async event => {
    event.preventDefault();

    const form = event.target;

    if (form.checkValidity() === false) {
      event.stopPropagation();
    }

    if (this.isValid(form)) {
      this.setState({ checking: true });

      try {
        const data = new FormData(form);

        let response = await axios.post(apiUrl + "/user/login.php", data);

        if (response.status === 200) {
          this.setState({ checking: false });

          login(response.data.jwt);

          this.props.onLogin();

          this.props.history.push("/account");
        } else {
          this.setState({
            checking: false,
            error: response.data.message
          });
        }
      } catch (error) {
        this.setState({
          checking: false,
          error: "An error has occured. Please try again later."
        });
      }
    } else {
      this.setState({ checking: false, error: "Please check the form." });
    }
  };

  render() {
    const { validated, checking, error, email, password } = this.state;

    return (
      <main role="main">
        <Container className="my-5">
          <h1 className="my-5 text-center">Log In</h1>

          <Card>
            <Card.Body>
              <Form
                noValidate
                validated={validated}
                onSubmit={this.handleSubmit}
              >
                <Row className="mb-4">
                  <Col>
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="Email"
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      {email}
                    </Form.Control.Feedback>
                  </Col>
                </Row>
                <Row className="mb-4">
                  <Col>
                    <Form.Control
                      type="password"
                      name="password"
                      placeholder="Password"
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      {password}
                    </Form.Control.Feedback>
                  </Col>
                </Row>
                {checking && (
                  <Row className="mb-4 text-center">
                    <Col>
                      <Spinner animation="grow" />
                    </Col>
                  </Row>
                )}
                {error && (
                  <Row className="mb-4 text-center">
                    <Col>
                      <span className="text-danger">{error}</span>
                    </Col>
                  </Row>
                )}
                {!checking && (
                  <Row>
                    <Col className="text-center">
                      <Button
                        className="mb-4"
                        variant="primary"
                        type="submit"
                        block
                      >
                        Login
                      </Button>
                    </Col>
                  </Row>
                )}
                <Row className="text-center">
                  <Col sm="6">
                    <Link to="/register">New user?</Link>
                  </Col>
                  <Col sm="6">
                    <Link to="/forgot-password">Forgot password?</Link>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Container>
      </main>
    );
  }
}
