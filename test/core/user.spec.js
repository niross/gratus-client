import { Map, fromJS } from 'immutable';

import * as core from '../../app/core/user';
import { expect } from 'chai';

describe('User logic', () => {
  it('sets user state', () => {
    const state = Map();
    const userData = {
      email: 'test@example.com',
      name: 'User 1',
      website: 'http://www.example.com',
      postFrequency: {
        monday: true,
        tuesday: false,
        wednesday: true,
        thursday: false,
        friday: true,
        saturday: false,
        sunday: true
      },
      postAmount: 3,
      postTime: 25200
    };
    const nextState = core.setUser(state, userData);
    expect(nextState).to.deep.equal(fromJS(userData));
  })
});
