import React, { FunctionComponent, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Button, Container } from '@material-ui/core';
import InfinityScroll from './components/infinityScroll/infinityScroll';
import Article from './components/article';
import Jumbotron from './components/shared/jumbotron';
import { articleActions } from './store';
import { RootState } from './store/state';
import { Article as ArticleModel } from './models/article';
import { hasEnoughPropsToRender } from './utils/helpers/article.helper';
import jumbotronImage from './assets/images/jumbotron.jpg';
import styles from './App.module.scss';
import Footer from './components/shared/footer/footer';

interface Props {
  hasMorePages: boolean;
  isLoading: boolean;
  articles: ArticleModel[];
  error: string;
  firstPage: () => void;
  nextPage: () => void;
}

const App: FunctionComponent<Props> = (props: Props) => {
  const [pauseScrolling, setPauseScrolling] = useState(false);

  useEffect(() => {
    props.firstPage();
  }, []);

  useEffect(() => {
    setPauseScrolling(Boolean(props.error));
  }, [props.error]);

  const retryScrolling = () => setPauseScrolling(false);

  return (
    <>
      <Jumbotron
        backgroundImage={jumbotronImage}
        backgroundColor="rgba(0,0,0,0.6)"
      >
        <p>Sample Article list</p>
        <h1>Acoustic Challenge</h1>
      </Jumbotron>
      <Container fixed>
        <InfinityScroll
          hasMore={props.hasMorePages}
          isLoading={props.isLoading}
          pause={pauseScrolling}
          next={props.nextPage}
        >
          {props.articles
            .filter(hasEnoughPropsToRender)
            .map((article: ArticleModel) => (
              <Article key={article.id} article={article} />
            ))}
        </InfinityScroll>

        {props.error && (
          <div className={styles.errorContainer}>
            <h5 className={styles.error}>
              An error occurred during fetching resources: {props.error}
            </h5>
            <Button
              variant="contained"
              color="primary"
              onClick={retryScrolling}
            >
              Retry
            </Button>
          </div>
        )}
      </Container>
      <Footer />
    </>
  );
};

export default connect(
  (state: RootState) => ({
    hasMorePages: state.articles.pagesCount > state.articles.currentPage,
    error: state.articles.error,
    isLoading: state.articles.isLoading,
    articles: state.articles.articles,
  }),
  dispatch => ({
    firstPage: () => dispatch(articleActions.fetchArticles(0)),
    nextPage: () => dispatch(articleActions.nextPage()),
  }),
)(App);
