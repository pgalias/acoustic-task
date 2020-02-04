import { ImageResolver } from './imageResolver';
import { Element } from '../../../models/article';

describe('ImageResolver', () => {
  let resolver: ImageResolver;

  beforeEach(() => {
    resolver = new ImageResolver();
  });

  test('should return asset object when element has image type', () => {
    const element: Element = {
      elementType: 'image',
      value: 'FooBar',
      asset: {
        resourceUri: 'http://localhost:3000',
        altText: 'FooBar',
      },
    };

    expect(resolver.resolve(element)).toEqual({
      src: 'http://localhost:3000',
      alt: 'FooBar',
    });
  });

  test('should return empty asset when element has image type and is without asset property', () => {
    const element: Element = {
      elementType: 'image',
      value: 'FooBar',
    };

    expect(resolver.resolve(element)).toEqual({
      src: '',
      alt: '',
    });
  });

  test('should return undefined when element has not image type', () => {
    const element: Element = {
      elementType: 'text',
      value: 'FooBar',
    };

    expect(resolver.resolve(element)).toBeUndefined();
  });
});
