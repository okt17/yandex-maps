/* eslint-disable no-undef */
import store from '.';
import { initialState as mapInitialState } from '../reducers/map';
import { initialState as waypointsInitialState } from '../reducers/waypoints';

test('store', () => {
  expect(store.getState()).toEqual({
    map: mapInitialState,
    waypoints: waypointsInitialState,
  });
});
