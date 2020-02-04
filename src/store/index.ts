import { applyMiddleware, compose, combineReducers, createStore } from 'redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable';

import {
  articleActions,
  articleReducer,
  fetchArticles$,
  changePage$,
} from './articles';

const rootEpic = combineEpics(fetchArticles$, changePage$);

const rootReducer = combineReducers({
  articles: articleReducer,
});

const epicMiddleware = createEpicMiddleware();

function configureStore() {
  const middlewares = [epicMiddleware];

  const enhancer = compose(applyMiddleware(...middlewares));

  return createStore(rootReducer, enhancer);
}

const store = configureStore();

epicMiddleware.run(rootEpic);

export { store, articleActions };
