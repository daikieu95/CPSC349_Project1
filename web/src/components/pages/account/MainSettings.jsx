import React, { Component } from "react";
import axios from "axios";
import { getCurrentUser, login } from "services/auth";
import { apiUrl } from "config.json";
import {
  Row,
  Col,
  Form,
  Image,
  Button,
  InputGroup,
  Spinner
} from "react-bootstrap";
import bsCustomFileInput from "bs-custom-file-input";

export default class MainSettings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      validated: false,
      checking: false,
      error: "",
      id: "",
      fullName: "",
      email: "",
      image: null,
      link: "",
      summary: "",
      location: "",
      ocupation: "",
      github: "",
      linkedIn: "",
      facebook: "",
      twitter: "",
      instagram: "",
      youtube: "",
      errors: {
        fullName: "",
        email: "",
        currentPassword: "",
        password: "",
        repassword: "",
        link: ""
      }
    };
  }

  componentDidMount() {
    bsCustomFileInput.init();

    const user = getCurrentUser();

    if (!user) {
      this.props.history.push("/account");
    } else {
      const imageUrl = apiUrl + user.image;

      this.setState({
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        image: imageUrl,
        link: user.link,
        summary: user.summary,
        location: user.location,
        ocupation: user.ocupation,
        github: user.github,
        linkedIn: user.linkedIn,
        facebook: user.facebook,
        twitter: user.twitter,
        instagram: user.instagram,
        youtube: user.youtube
      });
    }
  }

  showImage = event => {
    this.setState({
      image: URL.createObjectURL(event.target.files[0])
    });
  };

  isValidPassword(password) {
    if (password) {
      if (!/[A-Z]/.test(password)) {
        return "Your password must contain at least one uppercase letter.";
      } else if (!/[a-z]/.test(password)) {
        return "Your password must contain at least one lowercase letter.";
      } else if (!/[0-9]/.test(password)) {
        return "Your password must contain at least one number.";
      } else if (!/[^a-zA-Z\d]/.test(password)) {
        return "Your password must contain at least one special character.";
      } else if (password.length < 8) {
        return "Your password must contain at least eight characters.";
      }
    }

    return "";
  }

  isFormValid(form) {
    const data = new FormData(form);
    const fullName = data.get("fullName");
    const email = data.get("email");
    const currentPassword = data.get("currentPassword");
    const password = data.get("password");
    const repassword = data.get("repassword");
    const link = data.get("link");

    let valid = true;

    form[0].setCustomValidity("Invalid");

    if (!fullName) {
      this.setState({ errors: { fullName: "Please enter your full name." } });
      valid = false;
    } else {
      if (!/\S+\x20\S+/.test(fullName)) {
        this.setState({
          errors: { fullName: "Please enter your first and last name." }
        });
        form[0].focus();
        valid = false;
      } else {
        form[0].setCustomValidity("");
      }
    }

    form[1].setCustomValidity("Invalid");

    if (!email) {
      this.setState({ errors: { email: "Please enter a your email." } });
      valid = false;
    } else {
      if (!/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email)) {
        this.setState({ errors: { email: "Please enter a valid email." } });
        valid = false;
      } else {
        form[1].setCustomValidity("");
      }
    }

    form[2].setCustomValidity("Invalid");

    if (currentPassword) {
      let currentPasswordValid = this.isValidPassword(currentPassword);

      form[2].setCustomValidity(currentPasswordValid);

      this.setState({ email: currentPasswordValid });

      form[3].setCustomValidity("Invalid");

      if (!password) {
        this.setState({
          errors: {
            password:
              "Please enter a new password or leave Current password blank."
          }
        });
        valid = false;
      } else {
        let passwordValid = this.isValidPassword(currentPassword);

        form[3].setCustomValidity(passwordValid);

        this.setState({ errors: { password: passwordValid } });

        valid = false;
      }

      form[4].setCustomValidity("Invalid");

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
          form[4].setCustomValidity("");
        }
      }
    } else {
      form[2].setCustomValidity("");
    }

    form[6].setCustomValidity("Invalid");

    if (!link) {
      this.setState({ link: "Please enter a link." });
      valid = false;
    } else {
      form[6].setCustomValidity("");
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

    if (this.isFormValid(form)) {
      this.setState({ checking: true });

      try {
        const data = new FormData(form);

        data.append("id", this.state.id);

        let response = await axios.post(apiUrl + "/user/update.php", data, {
          headers: {
            "content-type": "multipart/form-data"
          }
        });

        if (response.status === 200) {
          this.setState({ checking: false });

          login(response.data.jwt);

          this.props.history.push("/user/" + data.link);
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
    const {
      validated,
      checking,
      error,
      fullName,
      email,
      image,
      link,
      summary,
      location,
      ocupation,
      github,
      linkedIn,
      facebook,
      twitter,
      instagram,
      youtube,
      errors
    } = this.state;

    let imageContent = (
      <span className="text-muted">Choose your new portfolio image.</span>
    );

    if (image) {
      imageContent = <Image src={image} alt="Main" fluid />;
    }

    return (
      <React.Fragment>
        <h4 className="mb-4">Main Settings</h4>
        <Form noValidate validated={validated} onSubmit={this.handleSubmit}>
          <Row className="mb-4">
            <Col>
              <Form.Control
                type="text"
                placeholder="Full name"
                name="fullName"
                defaultValue={fullName}
                required
                autoFocus={true}
              />
              <Form.Control.Feedback type="invalid">
                {errors.fullName}
              </Form.Control.Feedback>
            </Col>
          </Row>
          <Row className="mb-4">
            <Col>
              <Form.Control
                type="email"
                placeholder="Email address"
                name="email"
                defaultValue={email}
                required
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Col>
          </Row>
          <Row className="mb-4">
            <Col>
              <Form.Control
                type="password"
                placeholder="Current password"
                name="currentPassword"
              />
              <Form.Control.Feedback type="invalid">
                {errors.currentPassword}
              </Form.Control.Feedback>
            </Col>
          </Row>
          <Row className="mb-4">
            <Col>
              <Form.Control
                type="password"
                placeholder="New password"
                name="password"
              />
              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
            </Col>
          </Row>
          <Row className="mb-4">
            <Col>
              <Form.Control
                type="password"
                placeholder="Confirm new password"
                name="repassword"
              />
              <Form.Control.Feedback type="invalid">
                {errors.repassword}
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
                  Choose your new portfolio image
                </Form.Label>
                <Form.Control
                  id="image"
                  type="file"
                  name="image"
                  className="custom-file-input form-control"
                  accept="image/*"
                  onChange={this.showImage}
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
                  defaultValue={link}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {errors.link}
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
                defaultValue={location}
              />
            </Col>
            <Col md="6">
              <Form.Control
                type="text"
                placeholder="Ocupation"
                name="ocupation"
                defaultValue={ocupation}
              />
            </Col>
          </Row>
          <Row className="mb-4">
            <Col md="6" className="mb-4 mb-md-0">
              <Form.Control
                type="text"
                placeholder="Github link"
                name="github"
                defaultValue={github}
              />
            </Col>
            <Col md="6">
              <Form.Control
                type="text"
                placeholder="LinkedIn link"
                name="linkedIn"
                defaultValue={linkedIn}
              />
            </Col>
          </Row>
          <Row className="mb-4">
            <Col md="6" className="mb-4 mb-md-0">
              <Form.Control
                type="text"
                placeholder="Facebook link"
                name="facebook"
                defaultValue={facebook}
              />
            </Col>
            <Col md="6">
              <Form.Control
                type="text"
                placeholder="Twitter link"
                name="twitter"
                defaultValue={twitter}
              />
            </Col>
          </Row>
          <Row className="mb-4">
            <Col md="6" className="mb-4 mb-md-0">
              <Form.Control
                type="text"
                placeholder="Instagram link"
                name="instagram"
                defaultValue={instagram}
              />
            </Col>
            <Col md="6">
              <Form.Control
                type="text"
                placeholder="YouTube link"
                name="youtube"
                defaultValue={youtube}
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
                defaultValue={summary}
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
                  Update
                </Button>
              </Col>
            </Row>
          )}
        </Form>
      </React.Fragment>
    );
  }
}
