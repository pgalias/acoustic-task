import { reducer as articleReducer } from './reducers';
import { fetchArticles$, changePage$ } from './epics';
import * as articleActions from './actions';

export {
  articleReducer,
  fetchArticles$,
  changePage$,
  articleActions,
};
