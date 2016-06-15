import { expect } from 'chai';
import { Map } from 'immutable';

import { reducer } from '../../app/reducers/user';
import * as actions from '../../app/actions/user';

const defaultState = Map();

describe('user reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).to.deep.equal(Map());
  });

  it('should handle SET_USER', () => {
    expect(reducer(defaultState, {
      type: actions.SET_USER,
      user: {
        name: 'Bob',
        email: 'bob@test.com'
      }
    }).toJS()).to.deep.equal({
      name: 'Bob',
      email: 'bob@test.com'
    });
  });
});
