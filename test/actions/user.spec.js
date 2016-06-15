import * as actions from '../../app/actions/user'

import { expect } from 'chai';

describe('User actions', () => {
  it('creates set user action', () => {
    expect(actions.setUser({ name: 'Test User 1' }))
      .to.deep.equal({
        type: actions.SET_USER,
        user: { name: 'Test User 1' }
      });
  });
});
