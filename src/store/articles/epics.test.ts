import { ActionsObservable, StateObservable } from 'redux-observable';
import MockAxios from 'axios-mock-adapter';
import axios from '../../utils/http/config';
import { changePage$, fetchArticles$ } from './epics';
import { ArticleActions } from './types';
import * as articleActions from './actions';
import { Subject } from 'rxjs';
import { RootState } from '../state';
import { defaultIfEmpty, toArray } from 'rxjs/operators';

describe('Article Epics', () => {
  describe('changePage$ epic', () => {
    test('next page action should call fetching articles pending action', done => {
      const action$ = ActionsObservable.of(articleActions.nextPage());
      // @ts-ignore
      const state$ = new StateObservable(new Subject<RootState>(), {
        articles: {
          pagesCount: 3,
          currentPage: 2,
          isLoading: false,
        },
      });
      // @ts-ignore
      changePage$(action$, state$).subscribe((actual: any) => {
        expect(actual).toEqual(articleActions.fetchArticles(2));
        done();
      });
    });

    test('next page action should not call fetching articles pending action when articles are already loading', done => {
      const action$ = ActionsObservable.of(articleActions.nextPage());
      // @ts-ignore
      const state$ = new StateObservable(new Subject<RootState>(), {
        articles: {
          pagesCount: 3,
          currentPage: 2,
          isLoading: true,
        },
      });
      // @ts-ignore
      changePage$(action$, state$)
        .pipe(defaultIfEmpty('foo'))
        .subscribe((actual: any) => {
          expect(actual).toEqual('foo');
          done();
        });
    });

    test('next page action should not call fetching articles when last page has been reached', done => {
      const action$ = ActionsObservable.of(articleActions.nextPage());
      // @ts-ignore
      const state$ = new StateObservable(new Subject<RootState>(), {
        articles: {
          pagesCount: 2,
          currentPage: 3,
          isLoading: false,
        },
      });
      // @ts-ignore
      changePage$(action$, state$)
        .pipe(defaultIfEmpty('bar'))
        .subscribe((actual: any) => {
          expect(actual).toEqual('bar');
          done();
        });
    });
  });

  describe('fetchArticles$ epic', () => {
    let mock: MockAxios;
    let spy: jest.SpyInstance;
    let action$: ActionsObservable<ArticleActions>;
    let state$: StateObservable<RootState>;

    beforeEach(() => {
      action$ = ActionsObservable.of(articleActions.fetchArticles(1));
      // @ts-ignore
      state$ = new StateObservable(new Subject<RootState>(), {
        articles: {
          pageSize: 5,
        },
      });

      mock = new MockAxios(axios);
      mock.onGet('/delivery/v1/search').reply(200, {
        numFound: 1,
        documents: [
          {
            id: 'foobar',
          },
        ],
      });
      mock.onGet('/delivery/v1/content/foobar').reply(200, {
        elements: {
          foo: {
            elementType: 'text',
            value: 'bar',
          },
        },
      });

      spy = jest.spyOn(axios, 'get');
    });

    afterEach(() => {
      spy.mockClear();
    });

    test('fetch articles pending should call set pages count and fetch articles success on successful fetching data from API', done => {
      // @ts-ignore
      fetchArticles$(action$, state$)
        .pipe(toArray())
        .subscribe((actual: any) => {
          expect(spy).toHaveBeenCalledTimes(2);
          expect(spy).toHaveBeenCalledWith(
            '/delivery/v1/search',
            expect.any(Object),
          );
          expect(spy).toHaveBeenNthCalledWith(
            2,
            '/delivery/v1/content/foobar',
            expect.any(Object),
          );

          expect(actual).toEqual([
            articleActions.setPagesCount(1),
            articleActions.fetchArticlesSuccess([
              {
                // @ts-ignore
                foo: 'bar',
              },
            ]),
          ]);

          done();
        });
    });

    test('fetch articles pending should call set pages count and fetch articles failure on fail fetching data from API', done => {
      mock.onGet('/delivery/v1/content/foobar').reply(400);

      // @ts-ignore
      fetchArticles$(action$, state$)
        .pipe(toArray())
        .subscribe((actual: any) => {
          expect(spy).toHaveBeenCalledWith(
            '/delivery/v1/search',
            expect.any(Object),
          );
          expect(spy).toHaveBeenNthCalledWith(
            2,
            '/delivery/v1/content/foobar',
            expect.any(Object),
          );

          expect(actual).toEqual([
            articleActions.setPagesCount(1),
            articleActions.fetchArticlesFailure(expect.any(String)),
          ]);

          done();
        });
    });

    test('fetch articles pending should call fetch articles failure on fail fetching pages count from API', done => {
      mock.onGet('/delivery/v1/search').reply(400);

      // @ts-ignore
      fetchArticles$(action$, state$)
        .pipe(toArray())
        .subscribe((actual: any) => {
          expect(spy).toHaveBeenCalledWith(
            '/delivery/v1/search',
            expect.any(Object),
          );
          expect(spy).not.toHaveBeenCalledWith(
            '/delivery/v1/content/foobar',
            expect.any(Object),
          );

          expect(actual).toEqual([
            articleActions.fetchArticlesFailure(expect.any(String)),
          ]);

          done();
        });
    });
  });
});
