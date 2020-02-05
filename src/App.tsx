import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Container } from '@material-ui/core';
import InfinityScroll from './components/infinityScroll/infinityScroll';
import Article from './components/article';
import { articleActions } from './store';
import { RootState } from './store/state';
import { Article as ArticleModel } from './models/article';
import { hasEnoughPropsToRender } from './utils/helpers/article.helper';

const App = (props: any) => {
  useEffect(() => {
    props.dispatch(articleActions.fetchArticles(0));
  }, []);

  return (
    <Container fixed>
      <InfinityScroll
        hasMore={props.currentPage < props.pagesCount}
        isLoading={props.isLoading}
        next={() => props.dispatch(articleActions.nextPage())}
      >
        {props.articles
          .filter(hasEnoughPropsToRender)
          .map((article: ArticleModel) => (
            <Article key={article.id} article={article} />
          ))}
      </InfinityScroll>
    </Container>
  );
};

export default connect((state: RootState) => ({
  pageSize: state.articles.pageSize,
  pagesCount: state.articles.pagesCount,
  currentPage: state.articles.currentPage,
  error: state.articles.error,
  isLoading: state.articles.isLoading,
  articles: state.articles.articles,
}))(App);
