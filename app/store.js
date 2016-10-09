import { Map, List } from 'immutable';
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware, combineReducers } from 'redux';

import { reducer as posts } from './reducers/posts';
import { reducer as user } from './reducers/user';

const reducer = combineReducers({ user, posts });
const defaultState = {
  user: Map(),
  posts: Map({
    posts: List()
  })
};

export function configureStore() {
  return createStore(
    reducer,
    defaultState,
    applyMiddleware(
      thunkMiddleware
    )
  );
}
