/* eslint-disable no-undef */
import React from 'react';
import renderer from 'react-test-renderer';
import Waypoints from '.';

function pass() {}

test('Waypoints component test', () => {
  const component = renderer.create(<Waypoints
    addWaypoint={pass}
    deleteWaypoint={pass}
    moveWaypoint={pass}
    newWaypointName='value'
    setNewWaypointName={pass}
    waypoints={[
      {
        id: '1',
        name: 'waypoint1',
        coordinates: [20, 18],
      },
    ]}
  />);

  const tree = component.toJSON();

  expect(tree).toMatchSnapshot();
});
