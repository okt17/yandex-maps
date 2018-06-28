/* eslint-disable no-undef */
import React from 'react';
import renderer from 'react-test-renderer';
import WaypointItemDropArea from '.';

test('WaypointItemDropArea test', () => {
  const component = renderer.create(<WaypointItemDropArea
    index={0}
    moveWaypoint={() => {}}
  />);

  const tree = component.toJSON();

  expect(tree).toMatchSnapshot();
});
