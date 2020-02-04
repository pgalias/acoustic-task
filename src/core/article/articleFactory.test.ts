import createMockInstance from 'jest-create-mock-instance';
import { when } from 'jest-when';
import { Dictionary } from 'lodash';
import articleFactory from './index';
import { ArticleFactory } from './articleFactory';
import { ElementResolverAggregate } from './elementResolverAggregate';
import { Element } from '../../models/article';

describe('ArticleFactory', () => {
  describe('unit test', () => {
    let factory: ArticleFactory;
    let aggregate: jest.Mocked<ElementResolverAggregate>;
    let elements: Dictionary<Element>;

    beforeEach(() => {
      elements = {
        foo: {
          elementType: 'text',
          value: 'Foo',
        },
        bar: {
          elementType: 'formattedtext',
          value: ['<span>Bar</span>'],
        },
        baz: {
          elementType: 'datetime',
          value: '2019-10-20T22:00:00Z',
        },
      };

      aggregate = createMockInstance(ElementResolverAggregate);
      factory = new ArticleFactory(aggregate);
    });

    test('should call aggregate on each passed element', () => {
      const expected = {
        foo: 'Foo',
        bar: ['<span>Bar</span>'],
        baz: new Date('2019-10-20T22:00:00Z'),
      };

      const mockedMethod = jest.fn();
      when(mockedMethod)
        .calledWith(elements.foo)
        .mockReturnValue(expected.foo)
        .calledWith(elements.bar)
        .mockReturnValue(expected.bar)
        .calledWith(elements.baz)
        .mockReturnValue(expected.baz);

      aggregate.resolve.mockImplementation(mockedMethod);

      expect(factory.create(elements)).toEqual(expected);
    });
  });

  describe('Integration test', () => {
    let elements: Dictionary<Element>;

    beforeEach(() => {
      elements = {
        header: {
          elementType: 'text',
          value: 'Im so heady',
        },
        body: {
          elementType: 'formattedtext',
          value: ['<p>Lorem ipsum</p>', '<p>Lorem ipsum</p>'],
        },
        cover: {
          elementType: 'image',
          value: '',
          asset: {
            resourceUri: 'http://localhost:3000',
            altText: 'some text',
          },
        },
        aux: {
          elementType: 'group',
          value: {
            caption: {
              elementType: 'text',
              value: 'Im so captiony',
            },
            author: {
              elementType: 'text',
              value: 'Im so authory',
            },
          },
        },
      };
    });

    test('should return resolve values for each passed element', () => {
      expect(articleFactory.create(elements)).toEqual({
        header: 'Im so heady',
        body: ['<p>Lorem ipsum</p>', '<p>Lorem ipsum</p>'],
        cover: {
          src: 'http://localhost:3000',
          alt: 'some text',
        },
        aux: {
          caption: 'Im so captiony',
          author: 'Im so authory',
        },
      });
    });
  });
});
