import { Map, List } from 'immutable';

import * as core from '../core/user';
import * as actions from '../actions/user';

const defaultState = Map();

export function reducer(state = defaultState, action) {
  switch (action.type) {
    case actions.SET_USER:
      return core.setUser(state, action.user);
    default:
      return state;
  }
}
