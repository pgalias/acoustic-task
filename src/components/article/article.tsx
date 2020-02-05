import React, { FunctionComponent } from 'react';
import { Container, Grid } from '@material-ui/core';
import { hasEnoughPropsToRender } from '../../utils/helpers/article.helper';
import { Article as ArticleModel } from '../../models/article';
import Image from '../shared/image';
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
    <div data-testid="article" className={styles.article}>
      <div className={styles.heading}>
        {mainImage?.leadImage?.src ? (
          <Image
            src={mainImage.leadImage.src}
            alt={mainImage.leadImage.alt}
            imageClassName={styles.image}
            containerClassName={styles.imageContainer}
          />
        ) : (
          <Image
            src="http://placekitten.com/270/"
            alt="kitten"
            imageClassName={styles.image}
            containerClassName={styles.imageContainer}
          />
        )}
        {heading && (
          <div className={styles.ribbon}>
            <Container>
              <Grid container spacing={1} alignItems="center">
                <Grid item xs={12} data-testid="heading">
                  <h4 className={styles.header}>{heading}</h4>
                </Grid>
              </Grid>
            </Container>
          </div>
        )}
      </div>

      {(body?.length > 0 || author || date) && (
        <div className={styles.content}>
          <Container>
            <Grid container spacing={1} alignItems="center">
              {author && (
                <Grid item xs data-testid="author">
                  <small>Author:</small>
                  <Text className={styles.text}>{author}</Text>
                </Grid>
              )}
              {date && (
                <Grid item xs className={styles.date} data-testid="date">
                  <small>Posted:</small>
                  <Date date={date} locale={'pl-Pl'} className={styles.text} />
                </Grid>
              )}
              <Grid item xs={12} className={styles.contentBody}>
                <FormattedText texts={body} limit={150} />
              </Grid>
            </Grid>
          </Container>
        </div>
      )}
    </div>
  );
};

export default Article;
