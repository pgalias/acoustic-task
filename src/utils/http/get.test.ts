import MockAxios from 'axios-mock-adapter';
import axios from './config';
import get from './get';

describe('http.get method', () => {
  test('it should return observable with response when status code is 200', done => {
    const mock = new MockAxios(axios);
    mock.onGet('https://google.com').reply(200, {
      foo: 'bar',
    });

    get('https://google.com').subscribe(response => {
      expect(response).toEqual({ foo: 'bar' });
      done();
    });
  }, 1500);

  test('it should return observable with error when status code is >= 400', done => {
    const mock = new MockAxios(axios);
    mock.onGet('https://google.com').reply(400, {
      error: 'foobar',
    });

    get('https://google.com').subscribe(
      () => {},
      ({ data, message, status }) => {
        expect(data).toEqual({ error: 'foobar' });
        expect(message).toContain('status code 400');
        expect(status).toBe(400);
        done();
      },
    );
  }, 1500);
});
