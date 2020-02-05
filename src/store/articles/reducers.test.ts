import { reducer, initialState } from './reducers';
import { ArticleActions, ArticleActionTypes, State } from './types';
import { createArticleStub } from '../../utils/helpers/article.helper';

describe('Articles Reducer', () => {
  describe('Next Page Action', () => {
    test('should increase current page by 1', () => {
      const currentState = initialState;
      const action = {
        type: ArticleActionTypes.NEXT_PAGE,
      } as ArticleActions;
      const expected = {
        ...currentState,
        currentPage: currentState.currentPage + 1,
      };

      expect(reducer(currentState, action)).toEqual(expected);
    });

    test('should not allow increase current page when current page is equal pages count', () => {
      const currentState = { ...initialState, pagesCount: 2, currentPage: 2 };
      const action = {
        type: ArticleActionTypes.NEXT_PAGE,
      } as ArticleActions;
      const expected = {
        ...currentState,
        currentPage: currentState.currentPage,
      };

      expect(reducer(currentState, action)).toEqual(expected);
    });
  });

  describe('Set Page Count Action', () => {
    test('should set pages count', () => {
      const currentState = initialState;
      const action = {
        type: ArticleActionTypes.SET_PAGES_COUNT,
        payload: 3,
      } as ArticleActions;
      const expected = { ...currentState, pagesCount: 3 };

      expect(reducer(currentState, action)).toEqual(expected);
    });
  });

  describe('Fetch Articles Actions', () => {
    test('pending action should set loading state', () => {
      const currentState = initialState;
      const action = {
        type: ArticleActionTypes.FETCH_ARTICLES_PENDING,
        payload: 1,
      } as ArticleActions;
      const expected = { ...currentState, isLoading: true };

      expect(reducer(currentState, action)).toEqual(expected);
    });

    test('success action should unset loading state (and errors) and add articles', () => {
      const article = createArticleStub();

      const currentState = { ...initialState, isLoading: true, error: 'foo' };
      const action = {
        type: ArticleActionTypes.FETCH_ARTICLES_SUCCESS,
        payload: [article],
      } as ArticleActions;
      const expected: State = {
        ...currentState,
        isLoading: false,
        error: null,
        articles: [article],
      };

      expect(reducer(currentState, action)).toEqual(expected);
    });

    test('success action should put only unique articles', () => {
      const article1 = createArticleStub({ id: '24 ' });
      const article2 = createArticleStub({ id: '25 ' });
      const article3 = createArticleStub({ id: '26 ' });

      const currentArticles = [article1, article2];
      const currentState = { ...initialState, articles: currentArticles };
      const action = {
        type: ArticleActionTypes.FETCH_ARTICLES_SUCCESS,
        payload: [article2, article3],
      } as ArticleActions;
      const expected = {
        ...currentState,
        articles: [article1, article2, article3],
      };

      expect(reducer(currentState, action)).toEqual(expected);
    });

    test('failure action should unset loading state and set error', () => {
      const currentState = { ...initialState, isLoading: true };
      const action = {
        type: ArticleActionTypes.FETCH_ARTICLES_FAILURE,
        payload: 'foobar',
      } as ArticleActions;
      const expected = { ...currentState, isLoading: false, error: 'foobar' };

      expect(reducer(currentState, action)).toEqual(expected);
    });
  });
});
