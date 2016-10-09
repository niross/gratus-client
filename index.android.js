import React from 'react';
import { AppRegistry, Navigator, BackAndroid } from 'react-native';

import { Gratus } from './app/Gratus';

let _navigator;
BackAndroid.addEventListener('hardwareBackPress', () => {
  if (_navigator && _navigator.getCurrentRoutes().length > 1) {
    _navigator.pop();
    return true;
  }
  return false;
});

class App extends React.Component {
  configureScene(route) {
    return route.sceneConfig || Navigator.SceneConfigs.HorizontalSwipeJump;
  }

  renderScene(route, navigator) {
    _navigator = navigator;
    const Component = route.component;
    return (
      <Component navigator={navigator} route={route} {...route.props} />
    );
  }

  render() {
    return (
      <Navigator
        style={{}}
        initialRoute={{
          index: 0,
          component: Gratus
        }}
        configureScene={this.configureScene}
        renderScene={this.renderScene}
      />
    );
  }
}

AppRegistry.registerComponent('gratus', () => App);
