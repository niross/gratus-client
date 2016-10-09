/**
 * Redux actions for the Post model
 */
import { host } from '../config';
import { checkStatus, parseJSON } from '../utils/request';

export const REQUEST_POSTS = 'REQUEST_POSTS';
export function requestPosts() {
  return {
    type: REQUEST_POSTS
  };
}

export const REQUEST_POSTS_FAILED = 'REQUEST_POSTS_FAILED';
export function requestPostsFailed(error) {
  return {
    type: REQUEST_POSTS_FAILED,
    error
  };
}

export const REQUEST_POSTS_COMPLETE = 'REQUEST_POSTS_COMPLETE';
export function requestPostsComplete(posts) {
  return {
    type: REQUEST_POSTS_COMPLETE,
    posts
  };
}

export function fetchPosts(token) {
  return function thunkCallback(dispatch) {
    dispatch(requestPosts());
    return fetch(`${host}/api/posts/`, {
      headers: {
        Authorization: token
      }
    })
      .then(checkStatus)
      .then(parseJSON)
      .then((posts) => {
        dispatch(requestPostsComplete(posts));
      })
      .catch((error) => {
        dispatch(requestPostsFailed(
          `An error occurred while fetching your posts (${error.response.status})`
        ));
      });
  };
}

export const ADD_POST = 'ADD_POST';
export function addPost() {
  return {
    type: ADD_POST
  };
}

export const ADD_POST_FAILED = 'ADD_POST_FAILED';
export function addPostFailed(error) {
  return {
    type: ADD_POST_FAILED,
    error
  };
}

export const ADD_POST_COMPLETE = 'ADD_POST_COMPLETE';
export function addPostComplete(post) {
  return {
    type: ADD_POST_COMPLETE,
    post
  };
}

export function createPost(post) {
  return function thunkCallback(dispatch) {
    dispatch(addPost());
    return fetch(`${host}/api/posts/`, {
      method: 'POST',
      body: JSON.stringify(post)
    })
      .then(checkStatus)
      .then(parseJSON)
      .then((newPost) => {
        dispatch(addPostComplete(newPost));
      })
      .catch((error) => {
        dispatch(addPostFailed(error.response.statusText));
      });
  };
}

export const DELETE_POST = 'DELETE_POST';
export function deletePost() {
  return {
    type: DELETE_POST
  };
}

export const DELETE_POST_FAILED = 'DELETE_POST_FAILED';
export function deletePostFailed(error) {
  return {
    type: DELETE_POST_FAILED,
    error
  };
}

export const DELETE_POST_COMPLETE = 'DELETE_POST_COMPLETE';
export function deletePostComplete(postId) {
  return {
    type: DELETE_POST_COMPLETE,
    postId
  };
}

export function removePost(post) {
  return function thunkCallback(dispatch) {
    dispatch(deletePost());
    return fetch(`${host}/api/posts/${post._id}`, {
      method: 'DELETE'
    })
      .then(checkStatus)
      .then(parseJSON)
      .then(() => {
        dispatch(deletePostComplete(post._id));
      })
      .catch((error) => {
        dispatch(deletePostFailed(error.response.statusText));
      });
  };
}

