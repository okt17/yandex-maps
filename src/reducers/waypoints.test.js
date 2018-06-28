/* eslint-disable no-undef */
import waypointsReducer, { initialState } from './waypoints';
import {
  ADD_WAYPOINT,
  DELETE_WAYPOINT,
} from '../actions/types';

test('waypointsReducer test', () => {
  expect(waypointsReducer(initialState, { type: 'UNEXPECTED_ACTION_TYPE' }))
    .toBe(initialState);

  const waypoint = {
    id: '1',
    name: 'waypoint1',
    coordinates: [0, 0],
  };

  expect(waypointsReducer(
    initialState,
    {
      type: ADD_WAYPOINT,
      payload: waypoint,
    },
  ))
    .toEqual({
      ...initialState,
      waypoints: [waypoint],
    });

  expect(waypointsReducer(
    {
      ...initialState,
      waypoints: [waypoint],
    },
    {
      type: DELETE_WAYPOINT,
      payload: waypoint.id,
    },
  ))
    .toEqual({
      ...initialState,
      waypoints: [],
    });
});
