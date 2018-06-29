/* eslint-disable no-undef */
import React from 'react';
import renderer from 'react-test-renderer';
import Map from '.';

test('Map component test', () => {
  const component = renderer.create(<Map
    initMap={() => {}}
  />);

  const tree = component.toJSON();

  expect(tree).toMatchSnapshot();
});
