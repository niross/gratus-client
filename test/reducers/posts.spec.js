import { expect } from 'chai';
import { fromJS } from 'immutable';

import { reducer } from '../../app/reducers/posts';
import * as actions from '../../app/actions/posts';

const defaultState = fromJS({
  loading: false,
  posts: []
});

describe('posts reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).to.deep.equal(fromJS({
      loading: true,
      posts: []
    }));
  });

  it('should handle REQUEST_POSTS', () => {
    expect(reducer(defaultState, {
      type: actions.REQUEST_POSTS
    }).toJS()).to.deep.equal({
      loading: true,
      posts: []
    });
  });

  it('should handle REQUEST_POSTS_FAILED', () => {
    expect(reducer(defaultState, {
      type: actions.REQUEST_POSTS_FAILED,
      error: 'Internal Server Error'
    }).toJS()).to.deep.equal({
      loading: false,
      error: 'Internal Server Error',
      posts: []
    });
  });

  it('should handle REQUEST_POSTS_COMPLETE', () => {
    expect(reducer(defaultState, {
      type: actions.REQUEST_POSTS_COMPLETE,
      posts: [{ _id: 111 }]
    }).toJS()).to.deep.equal({
      loading: false,
      posts: [{ _id: 111 }]
    });
  });

  it('should handle ADD_POST', () => {
    expect(reducer(defaultState, {
      type: actions.ADD_POST
    }).toJS()).to.deep.equal({
      loading: true,
      posts: []
    });
  });

  it('should handle ADD_POST_FAILED', () => {
    expect(reducer(defaultState, {
      type: actions.ADD_POST_FAILED,
      error: 'Internal Server Error'
    }).toJS()).to.deep.equal({
      loading: false,
      error: 'Internal Server Error',
      posts: []
    });
  });

  it('should handle ADD_POST_COMPLETE', () => {
    expect(reducer(defaultState, {
      type: actions.ADD_POST_COMPLETE,
      post: { _id: 999 }
    }).toJS()).to.deep.equal({
      loading: false,
      posts: [{ _id: 999 }]
    });
  });

  it('should handle DELETE_POST', () => {
    expect(reducer(defaultState, {
      type: actions.DELETE_POST
    }).toJS()).to.deep.equal({
      loading: true,
      posts: []
    });
  });

  it('should handle DELETE_POST_FAILED', () => {
    expect(reducer(defaultState, {
      type: actions.DELETE_POST_FAILED,
      error: 'Internal Server Error'
    }).toJS()).to.deep.equal({
      loading: false,
      error: 'Internal Server Error',
      posts: []
    });
  });

  it('should handle DELETE_POST_COMPLETE', () => {
    expect(reducer(defaultState.set('posts', fromJS([{ _id: 888 }])), {
      type: actions.DELETE_POST_COMPLETE,
      postId: 888
    }).toJS()).to.deep.equal({
      loading: false,
      posts: []
    });
  });
});
