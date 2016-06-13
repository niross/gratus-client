/**
 * As stateless components have no internal instance they need to be wrapped
 * in a stateful component to allow us to test them
 */
/* eslint-disable react/prefer-stateless-function  */
/* eslint-disable react/prefer-es6-class */
import React, { PropTypes } from 'react';

export class Wrapper extends React.Component {
  render() {
    return (
      <span>
        {this.props.children}
      </span>
    );
  }
}

Wrapper.propTypes = {
  children: PropTypes.node
};
