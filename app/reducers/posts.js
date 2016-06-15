import { Map, List } from 'immutable';

import * as core from '../core/posts';
import * as actions from '../actions/posts';

const defaultState = Map({
  loading: true,
  posts: List()
});

export function reducer(state = defaultState, action) {
  switch (action.type) {
    case actions.REQUEST_POSTS:
      return core.requestPosts(state);
    case actions.REQUEST_POSTS_FAILED:
      return core.requestPostsFailed(state, action.error);
    case actions.REQUEST_POSTS_COMPLETE:
      return core.requestPostsComplete(state, action.posts);
    case actions.ADD_POST:
      return core.addPost(state);
    case actions.ADD_POST_FAILED:
      return core.addPostFailed(state, action.error);
    case actions.ADD_POST_COMPLETE:
      return core.addPostComplete(state, action.post);
    case actions.DELETE_POST:
      return core.deletePost(state);
    case actions.DELETE_POST_FAILED:
      return core.deletePostFailed(state, action.error);
    case actions.DELETE_POST_COMPLETE:
      return core.deletePostComplete(state, action.postId);
    default:
      return state;
  }
}
