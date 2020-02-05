import { StateObservable } from 'redux-observable';
import { combineLatest, concat, Observable, of } from 'rxjs';
import { catchError, filter, map, mergeMap, switchMap } from 'rxjs/operators';
import { isOfType } from 'typesafe-actions';
import * as actions from './actions';
import { ArticleActions, ArticleActionTypes } from './types';
import {
  Response as SearchResponse,
  searchForArticle,
} from '../../core/http/search';
import { retrieveArticle } from '../../core/http/retrieveArticle';
import { RootState } from '../state';
import { Article } from '../../models/article';

export const fetchArticles$ = (
  action$: Observable<ArticleActions>,
  state$: StateObservable<RootState>,
) =>
  action$.pipe(
    filter(isOfType(ArticleActionTypes.FETCH_ARTICLES_PENDING)),
    switchMap(({ payload }) =>
      searchForArticle(state$.value.articles.pageSize, payload),
    ),
    mergeMap((response: SearchResponse) => {
      const pagesCount = Math.max(
        1,
        Math.ceil(response.numFound / state$.value.articles.pageSize) - 1,
      );

      return concat(
        of(actions.setPagesCount(pagesCount)),
        combineLatest(
          response.documents.map(document => retrieveArticle(document.id)),
        ).pipe(
          map((articles: Article[]) => actions.fetchArticlesSuccess(articles)),
          catchError(error => of(actions.fetchArticlesFailure(error.message))),
        ),
      );
    }),
  );

export const changePage$ = (
  action$: Observable<ArticleActions>,
  state$: StateObservable<RootState>,
) =>
  action$.pipe(
    filter(isOfType(ArticleActionTypes.NEXT_PAGE)),
    filter(() => !state$.value.articles.isLoading),
    filter(
      () =>
        state$.value.articles.pagesCount >= state$.value.articles.currentPage,
    ),
    mergeMap(() =>
      of(actions.fetchArticles(state$.value.articles.currentPage)),
    ),
  );
