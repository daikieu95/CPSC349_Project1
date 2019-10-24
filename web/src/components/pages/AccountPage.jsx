import React, { Component } from "react";
import { getCurrentUser } from "services/auth";
import { Container, Row, Col, Nav, Tab } from "react-bootstrap";
import MainSettings from "./account/MainSettings";
import ProjectSettings from "./account/ProjectSettings";

export default class AccountPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      link: "",
      id: "",
      pro: false,
      projects: []
    };
  }

  componentDidMount() {
    const user = getCurrentUser();

    if (!user) {
      this.props.history.push("/account");
    } else {
      const userPro = user.pro === "0" ? false : true;
      this.setState({
        id: user.id,
        link: user.link,
        pro: userPro,
        projects: user.projects
      });
    }
  }

  render() {
    const { id, link, pro, projects } = this.state;
    const numberOfProjects = pro ? 8 : 4;

    let projectsTabPanes;

    if (projects.length) {
      projectsTabPanes = (
        <React.Fragment>
          {projects.map((project, index) => (
            <Tab.Pane key={project.id} eventKey={`project${index + 1}Settings`}>
              <ProjectSettings
                project={project}
                number={index + 1}
                exists={true}
              />
            </Tab.Pane>
          ))}
        </React.Fragment>
      );
    } else {
      const tempProjects = [...Array(numberOfProjects)].map(
        (element, index) => {
          return {
            id: index,
            title: "",
            image: "",
            summary: "",
            demo: "",
            code: ""
          };
        }
      );

      projectsTabPanes = (
        <React.Fragment>
          {tempProjects.map((project, index) => (
            <Tab.Pane key={project.id} eventKey={`project${index + 1}Settings`}>
              <ProjectSettings
                project={project}
                number={index + 1}
                exists={false}
                link={link}
                user={id}
                {...this.props}
              />
            </Tab.Pane>
          ))}
        </React.Fragment>
      );
    }

    return (
      <main role="main" id="account">
        <Container className="text-center my-5">
          <h1>Account</h1>
          <Tab.Container id="features" defaultActiveKey="mainSettings">
            <Row className="my-5 border">
              <Col sm="3" className="px-0 bg-info">
                <Nav variant="pills" className="flex-column">
                  <Nav.Item className="m-0">
                    <Nav.Link
                      eventKey="mainSettings"
                      className="d-flex justify-content-between"
                    >
                      Main Settings
                    </Nav.Link>
                  </Nav.Item>
                  {[...Array(numberOfProjects)].map((project, index) => (
                    <Nav.Item key={index} className="m-0">
                      <Nav.Link
                        eventKey={`project${index + 1}Settings`}
                        className="d-flex justify-content-between"
                      >
                        Project {index + 1} Settings
                      </Nav.Link>
                    </Nav.Item>
                  ))}
                  <Nav.Item className="m-0">
                    <Nav.Link
                      eventKey="proSettings"
                      className="d-flex justify-content-between"
                    >
                      Pro Settings
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
              <Col sm="9" className="py-4">
                <Tab.Content>
                  <Tab.Pane eventKey="mainSettings">
                    <MainSettings {...this.props} />
                  </Tab.Pane>
                  {projectsTabPanes}
                  <Tab.Pane eventKey="proSettings">{pro}</Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </Container>
      </main>
    );
  }
}
