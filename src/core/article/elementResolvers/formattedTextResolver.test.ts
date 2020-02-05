import { FormattedTextResolver } from './formattedTextResolver';
import { Element } from '../../../models/element';

describe('FormattedTextResolver', () => {
  let resolver: FormattedTextResolver;

  beforeEach(() => {
    resolver = new FormattedTextResolver();
  });

  test('should return string array if element has formattedtext type', () => {
    const element: Partial<Element> = {
      elementType: 'formattedtext',
      values: ['<p>Foo</p>', '<a href="#">Bar</a>'],
    };

    expect(resolver.resolve(element)).toEqual([
      '<p>Foo</p>',
      '<a href="#">Bar</a>',
    ]);
  });
});
