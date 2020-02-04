import { ActionType } from 'typesafe-actions';
import * as actions from './actions';
import { Article } from '../../models/article';

export enum ArticleActionTypes {
  NEXT_PAGE = 'articles/NEXT_PAGE',
  SET_PAGES_COUNT = 'articles/SET_PAGES_COUNT',

  FETCH_ARTICLES_PENDING = 'articles/FETCH_ARTICLES_PENDING',
  FETCH_ARTICLES_SUCCESS = 'articles/FETCH_ARTICLES_SUCCESS',
  FETCH_ARTICLES_FAILURE = 'articles/FETCH_ARTICLES_FAILURE',
}

export interface State {
  readonly currentPage: number;
  readonly pageSize: number;
  readonly pagesCount: number;
  readonly isLoading: boolean;
  readonly error: string;
  readonly articles: Article[];
}

export type ArticleActions = ActionType<typeof actions>;
