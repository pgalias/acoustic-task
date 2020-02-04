import { action } from 'typesafe-actions';
import { ArticleActionTypes } from './types';
import { Article } from '../../models/article';

export const nextPage = () => action(ArticleActionTypes.NEXT_PAGE);

export const setPagesCount = (pagesCount: number) => {
  return action(ArticleActionTypes.SET_PAGES_COUNT, pagesCount);
};

export const fetchArticles = (pageNumber: number) => {
  return action(ArticleActionTypes.FETCH_ARTICLES_PENDING, pageNumber);
};

export const fetchArticlesSuccess = (articles: Article[]) => {
  return action(ArticleActionTypes.FETCH_ARTICLES_SUCCESS, articles);
};

export const fetchArticlesFailure = (error: string) => {
  return action(ArticleActionTypes.FETCH_ARTICLES_FAILURE, error);
};
