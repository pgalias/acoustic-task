import { hasEnoughPropsToRender } from './article.helper';
import each from 'jest-each';

describe('hasEnoughtPropsToRender method', () => {
  each([
    [{ heading: 'Foo', author: 'Author', date: new Date(), body: ['foo'] }],
    [{ heading: 'Foo', author: 'Author' }],
    [{ heading: 'Foo', author: 'Author', date: null, body: undefined }],
  ]).test('should be truthy for given articles', article => {
    expect(hasEnoughPropsToRender(article)).toBeTruthy();
  });

  each([
    [
      {
        heading: undefined,
        author: null,
        date: null,
        body: null,
        mainImage: {},
      },
    ],
    [{}],
  ]).test('should be falsy for all Nil properties (except image)', article => {
    expect(hasEnoughPropsToRender(article)).toBeFalsy();
  });
});
