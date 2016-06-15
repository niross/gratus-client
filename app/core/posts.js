/**
 * Manage data representing posts
 */
import { fromJS } from 'immutable';

/**
 * Bulk set posts using data from the backend. This will overwrite all posts in the store.
 * @param {Immutable.Map} state - current state of the store
 * @param {Object[]} data - post data in the format
 *   [{
 *     _id: 123456,
 *     created: '2016-01-01',
 *     location: { x: 1, y: 2 },
 *     image: { mimetype: 'image/jpeg', path: '/blah/', name: 'image-name.jpg' },
 *     public: false,
 *     text: 'The text of the post'
 *   }, ...]
 * @returns {Immutable.Map} - the new state in the format:
 *   List([
 *     Map({
 *       loading: bool,
 *       error: string,
 *       posts: List(Map({
 *         _id: int,
 *         loading: bool,
 *         error: string,
 *         created: Date,
 *         location: Map({
 *           x: int,
 *           y: int,
 *         }),
 *         image: Map({
 *           mimetype: string,
 *           path: string,
 *           name: string
 *         }),
 *         public: bool,
 *         text: string
 *       }))
 *     }), ...
 *   ])
 */
export function setPosts(state, posts) {
  return state.set('posts', fromJS(posts));
}

/**
 * Append a post to the list of posts in the state tree
 * @param {Immutable.Map} state - the current state
 * @param {Object} post - data representing a post as received from the backend
 * @returns {Immutable.Map} - new state
 */
export function appendPost(state, post) {
  return state.set('posts', state.get('posts').push(fromJS(post)));
}

/**
 * Set loading state while post request is in progress
 * @param {Immutable.Map} state - the current state
 * @returns {Immutable.Map} - new state
 */
export function requestPosts(state) {
  return state.delete('error').set('loading', true);
}

/**
 * Set error state when posts request fails
 * @param {Immutable.Map} state
 * @param {Object} error
 * @returns {Immutable.Map}
 */
export function requestPostsFailed(state, error) {
  return state.set('loading', false).set('error', error);
}

/**
 * Set loading state and add posts to state tree
 * @param {Immutable.Map} state
 * @param {Object[]} posts
 * @returns {Immutable.Map}
 */
export function requestPostsComplete(state, posts) {
  const nextState = state.set('loading', false);
  return setPosts(nextState, posts);
}

/**
 * Set loading state while create post request is in progress
 * @param {Immutable.Map} state
 * @returns {Immutable.Map}
 */
export function addPost(state) {
  return state.delete('error').set('loading', true);
}

/**
 * Set error state when post create request fails
 * @param {Immutable.Map} state
 * @param {Object} error
 * @returns {Immutable.Map}
 */
export function addPostFailed(state, error) {
  return state.set('loading', false).set('error', error);
}

/**
 * Set loading state and add new post on successful post create request
 * @param {Immutable.Map} state
 * @param {Object} post
 * @returns {Immutable.Map}
 */
export function addPostComplete(state, post) {
  const nextState = state.set('loading', false);
  return appendPost(nextState, post);
}

/**
 * Set loading state while delte post request is in progress
 * @param {Immutable.Map} state
 * @returns {Immutable.Map}
 */
export function deletePost(state) {
  return state.delete('error').set('loading', true);
}

/**
 * Set error state when post delete request fails
 * @param {Immutable.Map} state
 * @param {Object} error
 * @returns {Immutable.Map}
 */
export function deletePostFailed(state, error) {
  return state.set('loading', false).set('error', error);
}

/**
 * Set loading state and remove post on successful post delete request
 * @param {Immutable.Map} state
 * @param {Number} postId
 * @returns {Immutable.Map}
 */
export function deletePostComplete(state, postId) {
  const posts = state.get('posts');
  return state
    .set('loading', false)
    .set('posts', posts.delete(
      posts.findIndex((post) => post.get('_id') === postId)
    ));
}
