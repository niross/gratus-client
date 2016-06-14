import { Map, fromJS } from 'immutable';

import * as core from '../../app/core/posts';
import { expect } from 'chai';

describe('Posts logic', () => {
  it('sets posts', () => {
    const state = Map();
    const postData = [{
      created: '2016-01-01',
      location: { x: 1, y: 2 },
      image: { mimetype: 'image/jpeg', path: '/test/', name: 'image-name.jpg' },
      public: false,
      text: 'Test post 1'
    }, {
      created: '2016-02-02',
      location: { x: 3, y: 4 },
      image: { mimetype: 'image/jpeg', path: '/test2/', name: 'image-name2.jpg' },
      public: true,
      text: 'Test post 2'
    }];
    const nextState = core.setPosts(state, postData);
    expect(nextState.toJS()).to.deep.equal({
      posts: postData
    });
  });

  it('appends a post', () => {
    const state = fromJS({
      posts: [{
        created: '2016-01-01',
        location: { x: 1, y: 2 },
        image: {
          mimetype: 'image/jpeg',
          path: '/test/',
          name: 'image-name.jpg'
        },
        public: false,
        text: 'Test post 1'
      }]
    });
    const postData = {
      created: '2016-02-02',
      location: { x: 3, y: 4 },
      image: {
        mimetype: 'image/jpeg',
        path: '/test2/',
        name: 'image-name2.jpg'
      },
      public: true,
      text: 'Test post 2'
    };
    const nextState = core.appendPost(state, postData);
    expect(nextState.toJS()).to.deep.equal({
      posts: [{
        created: '2016-01-01',
        location: { x: 1, y: 2 },
        image: {
          mimetype: 'image/jpeg',
          path: '/test/',
          name: 'image-name.jpg'
        },
        public: false,
        text: 'Test post 1'
      }, {
        created: '2016-02-02',
        location: { x: 3, y: 4 },
        image: {
          mimetype: 'image/jpeg',
          path: '/test2/',
          name: 'image-name2.jpg'
        },
        public: true,
        text: 'Test post 2'
      }]
    });
  });

  it('sets loading state', () => {
    const state = fromJS({
      loading: false,
      error: 'this is an error',
      posts: [{
        created: '2016-01-01',
        location: { x: 1, y: 2 },
        image: {
          mimetype: 'image/jpeg',
          path: '/test/',
          name: 'image-name.jpg'
        },
        public: false,
        text: 'Test post 1'
      }]
    });
    const nextState = core.requestPosts(state);
    expect(nextState.toJS()).to.deep.equal({
      loading: true,
      posts: [{
        created: '2016-01-01',
        location: { x: 1, y: 2 },
        image: {
          mimetype: 'image/jpeg',
          path: '/test/',
          name: 'image-name.jpg'
        },
        public: false,
        text: 'Test post 1'
      }]
    });
  });

  it('sets error state', () => {
    const state = fromJS({
      loading: true,
      posts: [{
        created: '2016-01-01',
        location: { x: 1, y: 2 },
        image: {
          mimetype: 'image/jpeg',
          path: '/test/',
          name: 'image-name.jpg'
        },
        public: false,
        text: 'Test post 1'
      }]
    });
    const nextState = core.requestPostsFailed(state, 'an error');
    expect(nextState.toJS()).to.deep.equal({
      loading: false,
      error: 'an error',
      posts: [{
        created: '2016-01-01',
        location: { x: 1, y: 2 },
        image: {
          mimetype: 'image/jpeg',
          path: '/test/',
          name: 'image-name.jpg'
        },
        public: false,
        text: 'Test post 1'
      }]
    });
  });

  it('sets state after succesful posts request', () => {
    const state = Map();
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
    const nextState = core.requestPostsComplete(state, posts);
    expect(nextState.toJS()).to.deep.equal({
      loading: false,
      posts: [{
        created: '2016-01-01',
        location: { x: 1, y: 2 },
        image: {
          mimetype: 'image/jpeg',
          path: '/test/',
          name: 'image-name.jpg'
        },
        public: false,
        text: 'Test post 1'
      }]
    });
  });

  it('sets loading state when adding a new post', () => {
    const state = fromJS({
      loading: false,
      error: 'an error',
      posts: [{
        created: '2016-01-01',
        location: { x: 1, y: 2 },
        image: {
          mimetype: 'image/jpeg',
          path: '/test/',
          name: 'image-name.jpg'
        },
        public: false,
        text: 'Test post 1'
      }]
    });
    const nextState = core.addPost(state);
    expect(nextState.toJS()).to.deep.equal({
      loading: true,
      posts: [{
        created: '2016-01-01',
        location: { x: 1, y: 2 },
        image: {
          mimetype: 'image/jpeg',
          path: '/test/',
          name: 'image-name.jpg'
        },
        public: false,
        text: 'Test post 1'
      }]
    });
  });

  it('sets error state when adding a new post fails', () => {
    const state = fromJS({
      loading: true,
      posts: [{
        created: '2016-01-01',
        location: { x: 1, y: 2 },
        image: {
          mimetype: 'image/jpeg',
          path: '/test/',
          name: 'image-name.jpg'
        },
        public: false,
        text: 'Test post 1'
      }]
    });
    const nextState = core.addPostFailed(state, 'another error');
    expect(nextState.toJS()).to.deep.equal({
      loading: false,
      error: 'another error',
      posts: [{
        created: '2016-01-01',
        location: { x: 1, y: 2 },
        image: {
          mimetype: 'image/jpeg',
          path: '/test/',
          name: 'image-name.jpg'
        },
        public: false,
        text: 'Test post 1'
      }]
    });
  });

  it('adds newly created post to the state', () => {
    const state = fromJS({
      loading: true,
      posts: [{
        created: '2016-01-01',
        location: { x: 1, y: 2 },
        image: {
          mimetype: 'image/jpeg',
          path: '/test/',
          name: 'image-name.jpg'
        },
        public: false,
        text: 'Test post 1'
      }]
    });
    const postData = {
      created: '2016-02-02',
      location: { x: 3, y: 4 },
      image: {
        mimetype: 'image/jpeg',
        path: '/test2/',
        name: 'image-name2.jpg'
      },
      public: true,
      text: 'Test post 2'
    };
    const nextState = core.addPostComplete(state, postData);
    expect(nextState.toJS()).to.deep.equal({
      loading: false,
      posts: [{
        created: '2016-01-01',
        location: { x: 1, y: 2 },
        image: {
          mimetype: 'image/jpeg',
          path: '/test/',
          name: 'image-name.jpg'
        },
        public: false,
        text: 'Test post 1'
      }, {
        created: '2016-02-02',
        location: { x: 3, y: 4 },
        image: {
          mimetype: 'image/jpeg',
          path: '/test2/',
          name: 'image-name2.jpg'
        },
        public: true,
        text: 'Test post 2'
      }]
    });
  });

  it('sets loading state when deleting a post', () => {
    const state = fromJS({
      loading: false,
      error: 'an error',
      posts: [{
        created: '2016-01-01',
        location: { x: 1, y: 2 },
        image: {
          mimetype: 'image/jpeg',
          path: '/test/',
          name: 'image-name.jpg'
        },
        public: false,
        text: 'Test post 1'
      }]
    });
    const nextState = core.deletePost(state);
    expect(nextState.toJS()).to.deep.equal({
      loading: true,
      posts: [{
        created: '2016-01-01',
        location: { x: 1, y: 2 },
        image: {
          mimetype: 'image/jpeg',
          path: '/test/',
          name: 'image-name.jpg'
        },
        public: false,
        text: 'Test post 1'
      }]
    });
  });

  it('sets error state when deleting a post fails', () => {
    const state = fromJS({
      loading: true,
      posts: [{
        created: '2016-01-01',
        location: { x: 1, y: 2 },
        image: {
          mimetype: 'image/jpeg',
          path: '/test/',
          name: 'image-name.jpg'
        },
        public: false,
        text: 'Test post 1'
      }]
    });
    const nextState = core.deletePostFailed(state, 'another error');
    expect(nextState.toJS()).to.deep.equal({
      loading: false,
      error: 'another error',
      posts: [{
        created: '2016-01-01',
        location: { x: 1, y: 2 },
        image: {
          mimetype: 'image/jpeg',
          path: '/test/',
          name: 'image-name.jpg'
        },
        public: false,
        text: 'Test post 1'
      }]
    });
  });

  it('removes deleted post from the state', () => {
    const state = fromJS({
      loading: true,
      posts: [{
        _id: 1234,
        created: '2016-01-01',
        location: { x: 1, y: 2 },
        image: {
          mimetype: 'image/jpeg',
          path: '/test/',
          name: 'image-name.jpg'
        },
        public: false,
        text: 'Test post 1'
      }, {
        _id: 2234,
        created: '2016-01-02',
        location: { x: 1, y: 2 },
        image: {
          mimetype: 'image/jpeg',
          path: '/test/',
          name: 'image-name2.jpg'
        },
        public: false,
        text: 'Test post 2'
      }]
    });
    const nextState = core.deletePostComplete(state, 1234);
    expect(nextState.toJS()).to.deep.equal({
      loading: false,
      posts: [{
        _id: 2234,
        created: '2016-01-02',
        location: { x: 1, y: 2 },
        image: {
          mimetype: 'image/jpeg',
          path: '/test/',
          name: 'image-name2.jpg'
        },
        public: false,
        text: 'Test post 2'
      }]
    });
  });
});
