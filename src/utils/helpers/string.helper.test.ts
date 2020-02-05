import each from 'jest-each';
import { truncate } from './string.helper';

each([
  ['Lorem ipsum dolor sit amet, consectetur', 20, 'Lorem ipsum dolor sit...'],
  ['Lorem ipsum dolor sit ', 20, 'Lorem ipsum dolor sit'],
  ['Lorem ipsum dolor sit', 20, 'Lorem ipsum dolor sit'],
  ['Lorem ipsum dolor si', 20, 'Lorem ipsum dolor si'],
  ['Lorem ipsum dolor s ', 20, 'Lorem ipsum dolor s'],
  ['', 20, ''],
  [null, 20, ''],
]).test(
  'should truncate %s to given amount of characters (%d) without cutting last word,',
  (str, limit, expected) => {
    expect(truncate(str, limit)).toEqual(expected);
  },
);
