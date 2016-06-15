import { Map } from 'immutable';
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware, combineReducers } from 'redux';

import { reducer as posts } from './reducers/posts';
import { reducer as users } from './reducers/user';

const reducer = combineReducers({ users, posts });

export function configureStore() {
  return createStore(
    reducer,
    Map(),
    applyMiddleware(
      thunkMiddleware
    )
  );
}
