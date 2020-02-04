import { ActionsObservable, StateObservable } from 'redux-observable';
import MockAxios from 'axios-mock-adapter';
import axios from '../../utils/http/config';
import { changePage$, fetchArticles$ } from './epics';
import { ArticleActions } from './types';
import * as articleActions from './actions';
import { Subject } from 'rxjs';
import { RootState } from '../state';
import { toArray } from 'rxjs/operators';

describe('Article Epics', () => {
  describe('changePage$ epic', () => {
    test('prev page action should call fetching articles pending action', done => {
      const action$ = ActionsObservable.of(articleActions.prevPage());
      // @ts-ignore
      const state$ = new StateObservable(new Subject<RootState>(), {
        articles: {
          currentPage: 2,
        },
      });
      // @ts-ignore
      changePage$(action$, state$).subscribe((actual: any) => {
        expect(actual).toEqual(articleActions.fetchArticles(2));
        done();
      });
    });

    test('next page action should call fetching articles pending action', done => {
      const action$ = ActionsObservable.of(articleActions.nextPage());
      // @ts-ignore
      const state$ = new StateObservable(new Subject<RootState>(), {
        articles: {
          currentPage: 2,
        },
      });
      // @ts-ignore
      changePage$(action$, state$).subscribe((actual: any) => {
        expect(actual).toEqual(articleActions.fetchArticles(2));
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
        foo: 'bar',
      });

      spy = jest.spyOn(axios, 'get');
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
  });
});
