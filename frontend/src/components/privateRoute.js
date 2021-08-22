import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { pingAuth } from '../redux/actions/auth';

const PrivateRoute = ({ component: Component, auth, ...rest }) => (
    <Route
      {...rest}
      render={(props) => {
        if (!auth.attemptedAuth && auth.access_token && auth.refresh_token) {
          rest.pingAuth()
        } else {
          if (auth.isLoading) {
            return <h2>Loading...</h2>;
          } else if (!auth.isAuthenticated) {
            return <Redirect to="/login" />;
          } else {
            return <Component {...props} />;
          }
        }
      }}
    />
);

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps,  { pingAuth })(PrivateRoute);