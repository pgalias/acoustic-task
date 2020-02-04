import { ArticleActionTypes, State, ArticleActions } from './types';
import { unionWith, isEqual } from 'lodash';

export const initialState: State = {
  currentPage: 0,
  pageSize: 5,
  pagesCount: 1,
  isLoading: false,
  error: null,
  articles: [],
};

export const reducer = (
  state: State = initialState,
  action: ArticleActions,
): State => {
  switch (action.type) {
    case ArticleActionTypes.NEXT_PAGE:
      return {
        ...state,
        currentPage: Math.min(state.currentPage + 1, state.pagesCount),
      };
    case ArticleActionTypes.SET_PAGES_COUNT:
      return {
        ...state,
        pagesCount: action.payload,
      };
    case ArticleActionTypes.FETCH_ARTICLES_PENDING:
      return {
        ...state,
        isLoading: true,
      };
    case ArticleActionTypes.FETCH_ARTICLES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        articles: unionWith(state.articles, action.payload, isEqual),
      };
    case ArticleActionTypes.FETCH_ARTICLES_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
