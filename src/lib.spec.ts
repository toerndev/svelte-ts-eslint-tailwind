import { libFunction } from './lib';

it('returns 12 for non-empty inputs', () => {
  ['a', 'b', 'c'].forEach((str) => {
    expect(libFunction(str)).toEqual(12);
  });
  expect(libFunction('')).toEqual(0);
});
