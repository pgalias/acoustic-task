import { ImageResolver } from './imageResolver';
import { Element } from '../../../models/element';

describe('ImageResolver', () => {
  let resolver: ImageResolver;

  beforeEach(() => {
    resolver = new ImageResolver();
  });

  test('should return asset object when element has image type', () => {
    const element: Partial<Element> = {
      elementType: 'image',
      value: 'FooBar',
      asset: {
        resourceUri: 'foo.jpg',
        altText: 'FooBar',
      },
    };

    expect(resolver.resolve(element)).toEqual({
      src: process.env.REACT_APP_API_BASE_URL + 'foo.jpg',
      alt: 'FooBar',
    });
  });

  test('should return empty asset when element has image type and is without asset property', () => {
    const element: Partial<Element> = {
      elementType: 'image',
      value: 'FooBar',
    };

    expect(resolver.resolve(element)).toEqual({
      src: '',
      alt: '',
    });
  });

  test('should return undefined when element has not image type', () => {
    const element: Partial<Element> = {
      elementType: 'text',
      value: 'FooBar',
    };

    expect(resolver.resolve(element)).toBeUndefined();
  });
});
