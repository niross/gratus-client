import React, { PropTypes } from 'react';
import { ToolbarAndroid } from 'react-native';

const propTypes = {
  title: PropTypes.string.isRequired,
  actions: PropTypes.array
};
const defaultProps = {
  actions: []
};

export const GratusToolbar = (props) =>
  <ToolbarAndroid
    style={{
      backgroundColor: '#FF0000',
      height: 58
    }}
    title={props.title}
    actions={props.actions}
    onActionSelected={(idx) => {
      props.actions[idx].onSelect();
    }}
  />;

GratusToolbar.propTypes = propTypes;
GratusToolbar.defaultProps = defaultProps;
