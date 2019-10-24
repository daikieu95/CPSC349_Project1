import React, { Component } from "react";
import {
  Container,
  Card,
  Form,
  Row,
  Col,
  Button,
  Spinner
} from "react-bootstrap";

export default class ResetPasswordPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      validated: false,
      checking: false,
      email: "",
      password: "",
      repassword: ""
    };
  }

  isValid(form) {
    const data = new FormData(form);
    const email = data.get("email");
    const password = data.get("password");
    const repassword = data.get("reassword");

    let valid = false;

    form[0].setCustomValidity("Invalid");

    if (!email) {
      this.setState({ email: "Please enter a your email." });
    } else {
      if (!/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/.test(email)) {
        this.setState({ email: "Please enter a valid email." });
      } else {
        form[0].setCustomValidity("");
        valid = true;
      }
    }

    form[1].setCustomValidity("Invalid");

    if (!password) {
      this.setState({ password: "Please enter a password." });
    } else {
      if (!/[A-Z]/.test(password)) {
        this.setState({
          password: "Your password must contain at least one uppercase letter."
        });
      } else if (!/[a-z]/.test(password)) {
        this.setState({
          password: "Your password must contain at least one lowercase letter."
        });
      } else if (!/[0-9]/.test(password)) {
        this.setState({
          password: "Your password must contain at least one number."
        });
      } else if (!/[^a-zA-Z\d]/.test(password)) {
        this.setState({
          password: "Your password must contain at least one special character."
        });
      } else if (password.length < 8) {
        this.setState({
          password: "Your password must contain at least eight characters."
        });
      } else {
        form[1].setCustomValidity("");
        valid = true;
      }
    }

    form[2].setCustomValidity("Invalid");

    if (!repassword) {
      this.setState({ repassword: "Please enter a password." });
    } else {
      if (repassword !== password) {
        this.setState({
          repassword: "Passwords do not match."
        });
      } else {
        form[2].setCustomValidity("");
        valid = true;
      }
    }

    this.setState({ validated: true });

    return valid;
  }

  handleSubmit = event => {
    event.preventDefault();

    const form = event.target;

    if (form.checkValidity() === false) {
      event.stopPropagation();
    }

    if (this.isValid(form)) {
      this.setState({ checking: true });

      console.log("Call api to check to get confirmation of password reset");
    }
  };

  render() {
    const { validated, checking, email, password, repassword } = this.state;

    return (
      <main role="main">
        <Container className="my-5 text-center">
          <h1 className="my-5">Password Reset</h1>

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
                      placeholder="Email address"
                      name="email"
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
                      placeholder="New password"
                      name="password"
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      {password}
                    </Form.Control.Feedback>
                  </Col>
                </Row>
                <Row className="mb-4">
                  <Col>
                    <Form.Control
                      type="password"
                      placeholder="Confirm password"
                      name="repassword"
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      {repassword}
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
                <Row>
                  <Col className="text-center">
                    <Button variant="primary" type="submit" block>
                      Change Password
                    </Button>
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
