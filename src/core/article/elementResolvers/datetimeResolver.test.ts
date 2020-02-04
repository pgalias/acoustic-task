import { DatetimeResolver } from './datetimeResolver';
import { Element } from '../../../models/article';

describe('DatetimeResolver', () => {
  let resolver: DatetimeResolver;

  beforeEach(() => {
    resolver = new DatetimeResolver();
  });

  test('should return parsed date if element has datetime type', () => {
    const element: Partial<Element> = {
      elementType: 'datetime',
      value: '2019-10-20T22:00:00Z',
    };

    expect(resolver.resolve(element)).toEqual(
      new Date(element.value as string),
    );
  });

  test('should return undefined if element has datetime type and invalid date as value', () => {
    const element: Partial<Element> = {
      elementType: 'datetime',
      value: 'foobar',
    };

    expect(resolver.resolve(element)).toBeUndefined();
  });

  test('should return undefined if element has not datetime type', () => {
    const element: Partial<Element> = {
      elementType: 'text',
      value: 'foobar',
    };

    expect(resolver.resolve(element)).toBeUndefined();
  });
});
