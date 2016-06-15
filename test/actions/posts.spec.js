const fetchMock = require('fetch-mock');
import configureMockStore from 'redux-mock-store';
import { expect } from 'chai';
import thunk from 'redux-thunk';

import { host } from '../../app/config';
import * as actions from '../../app/actions/posts';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Post actions', () => {
  afterEach((done) => {
    fetchMock.restore();
    setTimeout(done);
  });

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

  it('fires REQUEST and COMPLETE on successful posts request', () => {
    const posts = [{
      created: '2016-01-01',
      location: { x: 1, y: 2 },
      image: {
        mimetype: 'image/jpeg',
        path: '/test/',
        name: 'image-name.jpg'
      },
      public: false,
      text: 'Test post 1'
    }];
    fetchMock.mock(`${host}/api/posts/`, posts);
    const expectedActions = [{
      type: actions.REQUEST_POSTS
    }, {
      type: actions.REQUEST_POSTS_COMPLETE,
      posts
    }];
    const store = mockStore({ posts: [] });
    return store.dispatch(actions.fetchPosts())
      .then(() => {
        expect(store.getActions()).to.deep.equal(expectedActions);
      });
  });

  it('fires REQUEST and FAILED on failed posts request', () => {
    fetchMock.mock(`${host}/api/posts/`, 500);
    const expectedActions = [{
      type: actions.REQUEST_POSTS
    }, {
      type: actions.REQUEST_POSTS_FAILED,
      error: 'Internal Server Error'
    }];
    const store = mockStore({ posts: [] });
    return store.dispatch(actions.fetchPosts())
      .then(() => {
        expect(store.getActions()).to.deep.equal(expectedActions);
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

  it('fires ADD and COMPLETE on successful post creation', () => {
    const post = {
      _id: 999,
      created: '2016-01-01',
      location: { x: 1, y: 2 },
      image: {
        mimetype: 'image/jpeg',
        path: '/test/',
        name: 'image-name.jpg'
      },
      public: false,
      text: 'Test post 1'
    };
    fetchMock.mock(`${host}/api/posts/`, post);
    const expectedActions = [{
      type: actions.ADD_POST
    }, {
      type: actions.ADD_POST_COMPLETE,
      post
    }];
    const store = mockStore({ posts: [] });
    return store.dispatch(actions.createPost(post))
      .then(() => {
        expect(store.getActions()).to.deep.equal(expectedActions);
      });
  });

  it('fires ADD and FAILED on failed post create request', () => {
    fetchMock.mock(`${host}/api/posts/`, 500);
    const post = {
      _id: 999,
      created: '2016-01-01',
      location: { x: 1, y: 2 },
      image: {
        mimetype: 'image/jpeg',
        path: '/test/',
        name: 'image-name.jpg'
      },
      public: false,
      text: 'Test post 1'
    };
    const expectedActions = [{
      type: actions.ADD_POST
    }, {
      type: actions.ADD_POST_FAILED,
      error: 'Internal Server Error'
    }];
    const store = mockStore({ posts: [] });
    return store.dispatch(actions.createPost(post))
      .then(() => {
        expect(store.getActions()).to.deep.equal(expectedActions);
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

  it('fires DELETE and COMPLETE on successful post delete', () => {
    const post = { _id: 999 };
    fetchMock.mock(`${host}/api/posts/${post._id}`, {
      message: 'OK'
    });
    const expectedActions = [{
      type: actions.DELETE_POST
    }, {
      type: actions.DELETE_POST_COMPLETE,
      postId: post._id
    }];
    const store = mockStore({ posts: [] });
    return store.dispatch(actions.removePost(post))
      .then(() => {
        expect(store.getActions()).to.deep.equal(expectedActions);
      });
  });

  it('fires DELETE and FAILED on failed post delete request', () => {
    const post = { _id: 999 };
    fetchMock.mock(`${host}/api/posts/${post._id}`, 500);
    const expectedActions = [{
      type: actions.DELETE_POST
    }, {
      type: actions.DELETE_POST_FAILED,
      error: 'Internal Server Error'
    }];
    const store = mockStore({ posts: [] });
    return store.dispatch(actions.removePost(post))
      .then(() => {
        expect(store.getActions()).to.deep.equal(expectedActions);
      });
  });
});
