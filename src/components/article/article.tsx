import React, { FunctionComponent } from 'react';
import { Button, Container, Grid, Divider } from '@material-ui/core';
import { hasEnoughPropsToRender } from '../../utils/helpers/article.helper';
import { Article as ArticleModel } from '../../models/article';
import Text from '../shared/text';
import FormattedText from '../shared/formattedText';
import Date from '../shared/date';
import styles from './article.module.scss';

interface Props {
  article: ArticleModel;
}

const Article: FunctionComponent<Props> = (props: Props) => {
  const { heading, author, body, date, mainImage } = props.article;

  if (!hasEnoughPropsToRender(props.article)) {
    return <div data-testid="article"></div>;
  }

  return (
    <div
      data-testid="article"
      className={styles.article}
      style={{ backgroundImage: `url(${mainImage?.leadImage?.src})` }}
    >
      <Container>
        <Grid container alignItems="center">
          {heading && (
            <Grid item xs={12}>
              <h4 className={styles.header}>{heading}</h4>
            </Grid>
          )}

          {(author || date) && (
            <Grid item xs={12}>
              <Grid container alignItems="center" justify="space-between">
                {author && (
                  <Grid item xs>
                    <small>Author:</small>
                    <Text className={styles.text}>{author}</Text>
                  </Grid>
                )}
                {date && (
                  <Grid item xs className={styles.date}>
                    <small>Posted:</small>
                    <Date
                      date={date}
                      locale={'pl-Pl'}
                      className={styles.text}
                    />
                  </Grid>
                )}
              </Grid>
            </Grid>
          )}

          {body?.length > 0 && (
            <Grid item xs={12} className={styles.contentBody}>
              <FormattedText texts={body} limit={150} />
            </Grid>
          )}
        </Grid>

        <Divider variant="middle" light className={styles.divider} />

        <Grid container justify="flex-start" className={styles.buttonContainer}>
          <Button variant="contained" color="primary">
            See more
          </Button>
        </Grid>
      </Container>
    </div>
  );
};

export default Article;
