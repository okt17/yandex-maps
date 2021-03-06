/* eslint-disable no-undef */
import { fetchAddress, moveItem } from '.';

test('moveItem test', () => {
  expect(moveItem([1, 2, 3, 4, 5], 3, 1)).toEqual([1, 4, 2, 3, 5]);
  expect(moveItem([1, 2, 3, 4, 5], 1, 3)).toEqual([1, 3, 2, 4, 5]);
  expect(moveItem([1, 2, 3, 4, 5], 2, 999)).toEqual([1, 2, 4, 5, 3]);
});

test('fetchAddress test', () => {
  expect(fetchAddress([0, 0]) instanceof Promise).toBe(true);
});
