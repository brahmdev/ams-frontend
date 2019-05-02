import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';


class AdminRoute extends Component {
  render() {
    const {
      exact,
      path,
      component: ComponentToRender,
      isLoggedIn,
      isAdmin,
      children,
      location
    } = this.props;
    const redirectPath = isLoggedIn ? '/notFound' : '/login';
    return (
      <Route
        exact={exact}
        path={path}
        render={() =>
          isLoggedIn && isAdmin ? (
            <ComponentToRender children={children} location={location} />
          ) : (
            <Redirect to={redirectPath} />
          )
        }
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    isLoggedIn: state.user.isLoggedIn,
    isAdmin: state.user.admin
  };
}

export default connect(mapStateToProps)(AdminRoute);
