import { ElementResolverAggregate } from './elementResolverAggregate';
import * as resolver from './elementResolvers';
import { Element } from '../../models/article';

describe('ElementResolverAggregate', () => {
  let aggregate: ElementResolverAggregate;
  let element: Partial<Element>;

  beforeEach(() => {
    aggregate = new ElementResolverAggregate();
    element = {
      elementType: 'datetime',
      value: '2019-10-20T22:00:00Z',
    };
  });

  test('should run through all resolvers to find proper element', () => {
    aggregate.addResolver(new resolver.DatetimeResolver());
    aggregate.addResolver(new resolver.ImageResolver());

    expect(aggregate.resolve(element)).toEqual(
      new Date(element.value as string),
    );
  });

  test('should return element value when any resolver fits to element', () => {
    aggregate.addResolver(new resolver.ImageResolver());

    expect(aggregate.resolve(element)).toEqual(element.value);
  });

  test('should return element value when any resolver was registered', () => {
    expect(aggregate.resolve(element)).toEqual(element.value);
  });
});
