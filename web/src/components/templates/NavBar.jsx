import React, { Component } from "react";
import { getCurrentUser, logout } from "services/auth";
import { withRouter } from "react-router";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav, Button } from "react-bootstrap";

class NavBar extends Component {
  constructor(props) {
    super(props);

    this.state = { isloggedIn: false, link: "" };
  }

  componentDidMount() {
    const user = getCurrentUser();

    if (user) {
      this.setState({ isloggedIn: true, link: user.link });
    }
  }

  logout = () => {
    logout();

    this.setState({ isloggedIn: false, link: "" });

    this.props.history.push("/");
  };

  toPortfolio = () => {
    this.props.history.push(`/user/${this.state.link}`);
  };

  render() {
    return (
      <Navbar expand="md" className="text-uppercase" bg="dark" variant="dark">
        <LinkContainer exact to="/">
          <Navbar.Brand>Portfolio Center</Navbar.Brand>
        </LinkContainer>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />

        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            <LinkContainer to="/features">
              <Nav.Link>Features</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/pricing">
              <Nav.Link>Pricing</Nav.Link>
            </LinkContainer>
            {this.state.isloggedIn && (
              <React.Fragment>
                <LinkContainer to="/account">
                  <Nav.Link>Account Settings</Nav.Link>
                </LinkContainer>
                <Nav.Link onClick={this.logout}>Logout</Nav.Link>
                <Button
                  variant="info"
                  size="sm"
                  className="ml-md-4"
                  onClick={this.toPortfolio}
                >
                  Portfolio
                </Button>
              </React.Fragment>
            )}
            {!this.state.isloggedIn && (
              <React.Fragment>
                <LinkContainer to="/login">
                  <Nav.Link>Login</Nav.Link>
                </LinkContainer>
                <Button
                  variant="info"
                  size="sm"
                  className="ml-md-4"
                  onClick={() => {
                    this.props.history.push("/register");
                  }}
                >
                  Create your portfolio
                </Button>
              </React.Fragment>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default withRouter(NavBar);
