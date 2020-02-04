import { reducer, initialState } from './reducers';
import { ArticleActions, ArticleActionTypes } from './types';

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

  describe('Prev Page Action', () => {
    test('should decrease current page by 1', () => {
      const currentState = { ...initialState, currentPage: 2 };
      const action = {
        type: ArticleActionTypes.PREV_PAGE,
      } as ArticleActions;
      const expected = {
        ...currentState,
        currentPage: currentState.currentPage - 1,
      };

      expect(reducer(currentState, action)).toEqual(expected);
    });

    test('should not allow decrease current page when current page is first', () => {
      const currentState = initialState;
      const action = {
        type: ArticleActionTypes.PREV_PAGE,
      } as ArticleActions;
      const expected = { ...currentState };

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

    test('success action should unset loading state and add articles', () => {
      const currentState = { ...initialState, isLoading: true };
      const action = {
        type: ArticleActionTypes.FETCH_ARTICLES_SUCCESS,
        payload: [{ foo: 'bar' }],
      } as ArticleActions;
      const expected = {
        ...currentState,
        isLoading: false,
        articles: [{ foo: 'bar' }],
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
