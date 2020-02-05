import createMockInstance from 'jest-create-mock-instance';
import { Dictionary } from 'lodash';
import { GroupResolver } from './groupResolver';
import { ArticleFactory } from '../articleFactory';
import { Element } from '../../../models/element';

describe('GroupResolver', () => {
  let resolver: GroupResolver;
  let factory: jest.Mocked<ArticleFactory<Dictionary<any>>>;

  beforeEach(() => {
    factory = createMockInstance(ArticleFactory) as jest.Mocked<
      ArticleFactory<Dictionary<any>>
    >;

    resolver = new GroupResolver(factory);
  });

  test('should return group of elements when element has group type', () => {
    const formattedText = ['<p>Lorem ipsum</p>', '<span>Dolor sit amet</span>'];

    const element: Partial<Element> = {
      elementType: 'group',
      value: ({
        mainText: {
          elementType: 'text',
          value: 'Foo',
        },
        secondaryText: {
          elementType: 'formattedtext',
          value: formattedText,
        },
      } as unknown) as Dictionary<any>,
    };

    const expected: Dictionary<any> = {
      mainText: 'Foo',
      secondaryText: formattedText,
    };

    factory.create.mockImplementation(() => expected);

    expect(resolver.resolve(element)).toEqual(expected);
  });

  test('should undefined when element has not group type', () => {
    const element: Partial<Element> = {
      elementType: 'text',
      value: 'FooBar',
    };

    expect(resolver.resolve(element)).toBeUndefined();
  });
});
