/* eslint-disable no-undef */
import React from 'react';
import renderer from 'react-test-renderer';
import WaypointItem from '.';

test('WaypointItem component test', () => {
  const component = renderer.create(<WaypointItem
    deleteWaypoint={() => {}}
    index={1337}
    waypoint={{
      name: 'waypoint',
      coordinates: [37, 13],
    }}
  />);

  const tree = component.toJSON();

  expect(tree).toMatchSnapshot();
});
