import each from 'jest-each';
import { isDate } from './date.helper';

each([
  ['2019-10-20T22:00:00Z', true],
  ['2019-10-20', true],
  ['10/20/2019', true],
  ['foo', false],
  [null, false],
]).test('isDate should check value %s', (date, expected) => {
  expect(isDate(date)).toBe(expected);
});
