import * as actions from '../../app/actions/posts'

import { expect } from 'chai';

describe('Post actions', () => {
  it('returns REQUEST_POSTS action', () => {
    expect(actions.requestPosts()).to.deep.equal({
      type: actions.REQUEST_POSTS
    });
  });

  it('returns REQUEST_POSTS_FAILED action', () => {
    expect(actions.requestPostsFailed('an error')).to.deep.equal({
      type: actions.REQUEST_POSTS_FAILED,
      error: 'an error'
    });
  });

  it('returns REQUEST_POSTS_COMPLETE action', () => {
    const posts = [{
      text: 'test post 1',
      location: { x: 1, y: 2 }
    }];
    expect(actions.requestPostsComplete(posts)).to.deep.equal({
      type: actions.REQUEST_POSTS_COMPLETE,
      posts
    });
  });

  it('returns ADD_POST action ', () => {
    expect(actions.addPost()).to.deep.equal({
      type: actions.ADD_POST
    });
  });

  it('returns ADD_POST_FAILED action', () => {
    expect(actions.addPostFailed('an error')).to.deep.equal({
      type: actions.ADD_POST_FAILED,
      error: 'an error'
    });
  });

  it('returns ADD_POST_COMPLETE action', () => {
    const post = {
      text: 'test post 1',
      location: { x: 1, y: 2 }
    };
    expect(actions.addPostComplete(post)).to.deep.equal({
      type: actions.ADD_POST_COMPLETE,
      post
    });
  });

  it('returns DELETE_POST action ', () => {
    expect(actions.deletePost()).to.deep.equal({
      type: actions.DELETE_POST
    });
  });

  it('returns DELETE_POST_FAILED action', () => {
    expect(actions.deletePostFailed('an error')).to.deep.equal({
      type: actions.DELETE_POST_FAILED,
      error: 'an error'
    });
  });

  it('returns DELETE_POST_COMPLETE action', () => {
    expect(actions.deletePostComplete(999)).to.deep.equal({
      type: actions.DELETE_POST_COMPLETE,
      postId: 999
    });
  });
});
