import createMockInstance from 'jest-create-mock-instance';
import { when } from 'jest-when';
import { Dictionary } from 'lodash';
import articleFactory from './index';
import { ArticleFactory } from './articleFactory';
import { ElementResolverAggregate } from './elementResolverAggregate';
import { Article } from '../../models/article';
import { Element, ElementValue } from '../../models/element';

describe('ArticleFactory', () => {
  describe('unit test', () => {
    let factory: ArticleFactory<Article>;
    let aggregate: jest.Mocked<ElementResolverAggregate>;
    let elements: Dictionary<Partial<Element>>;

    beforeEach(() => {
      elements = {
        foo: {
          elementType: 'text',
          value: 'Foo',
        },
        bar: {
          elementType: 'formattedtext',
          values: ['<span>Bar</span>'],
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
    let elements: Dictionary<Partial<Element>>;

    beforeEach(() => {
      elements = {
        header: {
          elementType: 'text',
          value: 'Im so heady',
        },
        body: {
          elementType: 'formattedtext',
          values: ['<p>Lorem ipsum</p>', '<p>Lorem ipsum</p>'],
        },
        cover: {
          elementType: 'image',
          value: '',
          asset: {
            resourceUri: 'foo.jpg',
            altText: 'some text',
          },
        },
        aux: {
          elementType: 'group',
          value: ({
            caption: {
              elementType: 'text',
              value: 'Im so captiony',
            },
            author: {
              elementType: 'text',
              value: 'Im so authory',
            },
          } as unknown) as ElementValue,
        },
      };
    });

    test('should return resolve values for each passed element', () => {
      expect(articleFactory.create(elements)).toEqual({
        header: 'Im so heady',
        body: ['<p>Lorem ipsum</p>', '<p>Lorem ipsum</p>'],
        cover: {
          src: process.env.REACT_APP_API_BASE_URL + 'foo.jpg',
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
