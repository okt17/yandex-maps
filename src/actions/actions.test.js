/* eslint-disable no-undef */
import { setNewWaypointName } from '.';

test('setNewWaypointName test', () => {
  expect(setNewWaypointName('value').payload).toBe('value');
});
