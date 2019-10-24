import React, { Component } from "react";
import axios from "axios";
import { getCurrentUser } from "services/auth";
import { apiUrl } from "config.json";
import {
  Container,
  Card,
  Form,
  Row,
  Col,
  Image,
  Button,
  InputGroup,
  Spinner
} from "react-bootstrap";
import bsCustomFileInput from "bs-custom-file-input";

export default class RegisterPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      validated: false,
      checking: false,
      error: "",
      img: null,
      fullName: "",
      email: "",
      password: "",
      repassword: "",
      link: ""
    };
  }

  componentDidMount() {
    bsCustomFileInput.init();

    if (getCurrentUser()) {
      this.props.history.push("/account");
    }
  }

  isValid(form) {
    const data = new FormData(form);
    const fullName = data.get("fullName");
    const email = data.get("email");
    const password = data.get("password");
    const repassword = data.get("repassword");
    const link = data.get("link");

    let valid = true;

    form[0].setCustomValidity("Invalid");

    if (!fullName) {
      this.setState({ fullName: "Please enter your full name." });
      valid = false;
    } else {
      if (!/\S+\x20\S+/.test(fullName)) {
        this.setState({ fullName: "Please enter your first and last name." });
        form[0].focus();
        valid = false;
      } else {
        form[0].setCustomValidity("");
      }
    }

    form[1].setCustomValidity("Invalid");

    if (!email) {
      this.setState({ email: "Please enter a your email." });
      valid = false;
    } else {
      if (!/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email)) {
        this.setState({ email: "Please enter a valid email." });
        valid = false;
      } else {
        form[1].setCustomValidity("");
      }
    }

    form[2].setCustomValidity("Invalid");

    if (!password) {
      this.setState({ password: "Please enter a password." });
      valid = false;
    } else {
      valid = false;

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
        form[2].setCustomValidity("");
        valid = true;
      }
    }

    form[3].setCustomValidity("Invalid");

    if (!repassword) {
      this.setState({ repassword: "Please enter a password." });
      valid = false;
    } else {
      if (repassword !== password) {
        this.setState({
          repassword: "Passwords do not match."
        });
        valid = false;
      } else {
        form[3].setCustomValidity("");
      }
    }

    form[5].setCustomValidity("Invalid");

    if (!link) {
      this.setState({ link: "Please enter a link." });
      valid = false;
    } else {
      form[5].setCustomValidity("");
    }

    this.setState({ validated: true });

    return valid;
  }

  showImage = event => {
    this.setState({
      img: URL.createObjectURL(event.target.files[0])
    });
  };

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

        let response = await axios.post(apiUrl + "/user/register.php", data, {
          headers: {
            "content-type": "multipart/form-data"
          }
        });

        if (response.status === 201) {
          this.setState({ checking: false });

          this.props.history.push("/login");
        } else {
          this.setState({
            checking: false,
            error: response.data.message
          });
        }
      } catch (error) {
        console.log(error.response);
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
    const {
      validated,
      checking,
      error,
      img,
      fullName,
      email,
      password,
      repassword,
      link
    } = this.state;

    let imageContent = (
      <span className="text-muted">Choose your portfolio image.</span>
    );

    if (img) {
      imageContent = <Image src={img} alt="Main" fluid />;
    }

    return (
      <main role="main">
        <Container className="my-5 text-center">
          <h1 className="my-5">Registration</h1>

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
                      type="text"
                      placeholder="Full name"
                      name="fullName"
                      required
                      autoFocus={true}
                    />
                    <Form.Control.Feedback type="invalid">
                      {fullName}
                    </Form.Control.Feedback>
                  </Col>
                </Row>
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
                      placeholder="Password"
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
                <Row className="mb-4">
                  <Col md="6" className="mx-auto">
                    {imageContent}
                  </Col>
                </Row>
                <Row className="mb-4">
                  <Col>
                    <div className="custom-file">
                      <Form.Label htmlFor="image" className="custom-file-label">
                        Choose your portfolio image
                      </Form.Label>
                      <Form.Control
                        id="image"
                        type="file"
                        name="image"
                        className="custom-file-input form-control"
                        accept="image/*"
                        onChange={this.showImage}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Please choose an image.
                      </Form.Control.Feedback>
                    </div>
                  </Col>
                </Row>
                <Row className="mb-4">
                  <Col>
                    <InputGroup>
                      <InputGroup.Prepend>
                        <InputGroup.Text id="basic-addon3">
                          https://porfoliocenter.com/user/
                        </InputGroup.Text>
                      </InputGroup.Prepend>
                      <Form.Control
                        type="text"
                        placeholder="Link to share"
                        name="link"
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        {link}
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Col>
                </Row>
                <Row className="mb-4">
                  <Col md="6" className="mb-4 mb-md-0">
                    <Form.Control
                      type="text"
                      placeholder="Location"
                      name="location"
                    />
                  </Col>
                  <Col md="6">
                    <Form.Control
                      type="text"
                      placeholder="Ocupation"
                      name="ocupation"
                    />
                  </Col>
                </Row>
                <Row className="mb-4">
                  <Col>
                    <Form.Control
                      as="textarea"
                      rows="5"
                      name="summary"
                      placeholder="Give us a summary about yourself."
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Please tell us a little bit about who you are.
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
                      <Button variant="primary" type="submit" block>
                        Sign Up
                      </Button>
                    </Col>
                  </Row>
                )}
              </Form>
            </Card.Body>
          </Card>
        </Container>
      </main>
    );
  }
}
