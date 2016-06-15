/**
 * Manage data representing the currently logged in user
 *
 * User Object:
 *
 *   Map({
 *     email: '',
 *     name: '',
 *     website: '',
 *     postFrequency: Map({
 *       monday: true,
 *       tuesday: true,
 *       wednesday: true,
 *       thursday: true,
 *       friday: true,
 *       saturday: true,
 *       sunday: true
 *     }),
 *     postAmount: 3,
 *     postTime: 25200
 *   })
 */
import { fromJS } from 'immutable';

export function setUser(state, user) {
  return state.merge(fromJS(user));
}
