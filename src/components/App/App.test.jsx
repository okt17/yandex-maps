/* eslint-disable no-undef */
import React from 'react';
import renderer from 'react-test-renderer';
import App from '.';

function pass() {}

test('App component test', () => {
  const component = renderer.create(<App
    map={{
      initMap: pass,
    }}
    waypoints={{
      addWaypoint: pass,
      deleteWaypoint: pass,
      moveWaypoint: pass,
      newWaypointName: 'value',
      setNewWaypointName: pass,
      waypoints: [
        {
          id: '1',
          name: 'waypoint1',
          coordinates: [20, 18],
        },
      ],
    }}
  />);

  const tree = component.toJSON();

  expect(tree).toMatchSnapshot();
});
