import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { apiUrl } from "config.json";
import { Row, Col, Form, Image, Button, Spinner } from "react-bootstrap";
import bsCustomFileInput from "bs-custom-file-input";

export default class ProjectSettings extends Component {
  static propTypes = {
    project: PropTypes.object.isRequired,
    number: PropTypes.number.isRequired,
    exists: PropTypes.bool.isRequired,
    link: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      validated: false,
      checking: false,
      error: "",
      image: null
    };
  }

  componentDidMount() {
    bsCustomFileInput.init();
  }

  showImage = event => {
    this.setState({
      image: URL.createObjectURL(event.target.files[0])
    });
  };

  async sendData(to, data) {
    this.setState({ checking: true });

    try {
      let response = await axios.post(to, data, {
        headers: {
          "content-type": "multipart/form-data"
        }
      });

      if (response.status === 200) {
        this.setState({ checking: false });

        this.props.history.push("/user/" + this.props.link);
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
  }

  handleSubmit = event => {
    event.preventDefault();

    const form = event.target;

    this.setState({ validated: true });

    if (form.checkValidity() === false) {
      event.stopPropagation();

      this.setState({ checking: false, error: "Please check the form." });
    } else {
      const { project, exists } = this.props;
      const data = new FormData(form);

      data.append("user", this.props.user);
      if (exists) {
        data.append("id", project.id);
        this.sendData(apiUrl + "/user/project/update.php", data);
      } else {
        this.sendData(apiUrl + "/user/project/create.php", data);
      }
    }
  };

  render() {
    const { validated, checking, error, image } = this.state;
    const { project, number, exists } = this.props;

    let imageContent = (
      <span className="text-muted">Choose your project {number} image.</span>
    );

    if (image) {
      imageContent = <Image src={image} alt="Project" fluid />;
    }

    return (
      <React.Fragment>
        <h4>Project {number} Settings</h4>
        <Form noValidate validated={validated} onSubmit={this.handleSubmit}>
          <Row className="mb-4">
            <Col>
              <Form.Control
                type="text"
                placeholder="Title"
                name="title"
                defaultValue={project.title}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide a title for your project.
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
                <Form.Label
                  htmlFor="projectImage"
                  className="custom-file-label"
                >
                  Choose your new portfolio image
                </Form.Label>
                <Form.Control
                  id={`project${number}Image`}
                  type="file"
                  name="image"
                  className="custom-file-input form-control"
                  accept="image/*"
                  onChange={this.showImage}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please provide an image for your project.
                </Form.Control.Feedback>
              </div>
            </Col>
          </Row>
          <Row className="mb-4">
            <Col md="6">
              <Form.Control
                type="text"
                placeholder="Demo Link"
                name="demo"
                defaultValue={project.demo}
              />
            </Col>
            <Col md="6">
              <Form.Control
                type="text"
                placeholder="Code Link"
                name="code"
                defaultValue={project.code}
              />
            </Col>
          </Row>
          <Row className="mb-4">
            <Col>
              <Form.Control
                as="textarea"
                rows="5"
                name="summary"
                placeholder="Give us a summary about your project."
                defaultValue={project.summary}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please tell us a little bit about your work.
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
                  {exists ? "Update" : "Create"}
                </Button>
              </Col>
            </Row>
          )}
        </Form>
      </React.Fragment>
    );
  }
}
