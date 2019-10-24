import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import { Route, Switch, Redirect } from "react-router-dom";

import NavBar from "./components/templates/NavBar";

import NotFoundPage from "./components/pages/NotFoundPage";

import HomePage from "./components/pages/HomePage";
import FeaturesPage from "./components/pages/FeaturesPage";
import PricingPage from "./components/pages/PricingPage";
import RegisterPage from "./components/pages/RegisterPage";
import LoginPage from "./components/pages/LoginPage";
import AccountPage from "./components/pages/AccountPage";
import ForgotPasswordPage from "./components/pages/ForgotPasswordPage";
import ResetPasswordPage from "./components/pages/ResetPasswordPage";
import ContactPage from "./components/pages/ContactPage";

import UserPage from "./components/pages/UserPage";

import Footer from "./components/templates/Footer";

class App extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.state = { refresh: false };
  }

  handleLogin = () => {
    this.setState({ refresh: true });
    window.location.reload();
  };

  render() {
    const { refresh } = this.state;
    const { pathname } = this.props.location;
    const path_tokens = pathname.split("/");

    if (path_tokens.length === 3 && path_tokens[1] === "user") {
      return <Route path="/user/:user" component={UserPage} />;
    } else {
      return (
        <React.Fragment>
          <NavBar />

          <Switch>
            <Route path="/not-found" component={NotFoundPage} />
            <Route path="/contact" component={ContactPage} />
            <Route path="/reset-password" component={ResetPasswordPage} />
            <Route path="/forgot-password" component={ForgotPasswordPage} />
            <Route path="/account" component={AccountPage} />
            <Route
              path="/login"
              component={() => (
                <LoginPage onLogin={this.handleLogin} {...this.props} />
              )}
            />
            <Route path="/register" component={RegisterPage} />
            <Route path="/pricing" component={PricingPage} />
            <Route path="/features" component={FeaturesPage} />
            <Route exact path="/" component={HomePage} />
            <Redirect to="/not-found" />
          </Switch>

          <Footer />
        </React.Fragment>
      );
    }
  }
}

export default withRouter(App);
