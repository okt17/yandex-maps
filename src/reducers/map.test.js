/* eslint-disable no-undef */
import mapReducer, { initialState } from './map';
import { INIT_MAP } from '../actions/types';

test('mapReducer test', () => {
  expect(mapReducer(initialState, { type: 'UNEXPECTED_ACTION_TYPE' }))
    .toBe(initialState);

  expect(mapReducer(initialState, { type: INIT_MAP, payload: { map: {} } }))
    .toEqual({
      ...initialState,
      map: {},
    });
});
