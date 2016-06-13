import React, { PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Navigator,
  AsyncStorage
} from 'react-native';

import { Authenticator } from 'jwt-authenticator';
import { host } from './config';

const propTypes = {
  navigator: PropTypes.object,
  route: PropTypes.object
};
const defaultProps = {};

export class Gratus extends React.Component {
  constructor(props) {
    super(props);
    AsyncStorage.clear();
  }

  render() {
    return (
      <Authenticator
        navigator={this.props.navigator}
        route={this.props.route}
        authenticateEndpoint={`${host}/api/accounts/authenticate`}
        registerEndpoint={`${host}/api/accounts/register`}
        logoText="Gratus"
      >
        <View style={styles.container}>
          <Text style={styles.welcome}>
            Welcome to Gratus!
          </Text>
        </View>
      </Authenticator>
    );
  }
}

Gratus.propTypes = propTypes;
Gratus.defaultProps = defaultProps;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  }
});
