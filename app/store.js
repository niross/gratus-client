import { List, Map } from 'immutable';
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware, combineReducers } from 'redux';

import { reducer as posts } from './reducers/posts';
import { reducer as user } from './reducers/user';

const reducer = combineReducers({ user, posts });

export function configureStore() {
  return createStore(
    reducer,
    { posts: List(), user: Map() },
    applyMiddleware(
      thunkMiddleware
    )
  );
}
