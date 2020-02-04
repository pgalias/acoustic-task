import createMockInstance from 'jest-create-mock-instance';
import { GroupResolver } from './groupResolver';
import { ArticleFactory } from '../articleFactory';
import { Element } from '../../../models/article';

describe('GroupResolver', () => {
  let resolver: GroupResolver;
  let factory: jest.Mocked<ArticleFactory>;

  beforeEach(() => {
    factory = createMockInstance(ArticleFactory);

    resolver = new GroupResolver(factory);
  });

  test('should return group of elements when element has group type', () => {
    const formattedText = ['<p>Lorem ipsum</p>', '<span>Dolor sit amet</span>'];

    const element: Element = {
      elementType: 'group',
      value: {
        mainText: {
          elementType: 'text',
          value: 'Foo',
        },
        secondaryText: {
          elementType: 'formattedtext',
          value: formattedText,
        },
      },
    };

    const expected = {
      mainText: 'Foo',
      secondaryText: formattedText,
    };

    factory.create.mockImplementation(() => expected);

    expect(resolver.resolve(element)).toEqual(expected);
  });

  test('should undefined when element has not group type', () => {
    const element: Element = {
      elementType: 'text',
      value: 'FooBar',
    };

    expect(resolver.resolve(element)).toBeUndefined();
  });
});
