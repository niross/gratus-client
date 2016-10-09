import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';

import { Authenticator } from 'jwt-authenticator';
import { host } from './config';
import { PostsContainer } from './containers/Posts';
import { configureStore } from './store';
import { setUser } from './actions/user';
import { fetchPosts } from './actions/posts';

const propTypes = {
  navigator: PropTypes.object,
  route: PropTypes.object
};
const defaultProps = {};

const store = configureStore();

export const Gratus = ({ navigator, route }) =>
  <Authenticator
    navigator={navigator}
    route={route}
    authenticateEndpoint={`${host}/api/accounts/authenticate`}
    registerEndpoint={`${host}/api/accounts/register`}
    logoText="Gratus"
    onAuthenticate={(user) => {
      store.dispatch(setUser(user));
      store.dispatch(fetchPosts(user.token));
    }}
  >
    <Provider store={store}>
      <PostsContainer
        navigator={navigator}
        route={route}
      />
    </Provider>
  </Authenticator>;

Gratus.propTypes = propTypes;
Gratus.defaultProps = defaultProps;
