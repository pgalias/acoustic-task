import React, { FunctionComponent } from 'react';
import { Box, Container, Grid } from '@material-ui/core';
import { every, isNil } from 'lodash';
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

  if (every([heading, author, body, date], isNil)) {
    return <></>;
  }

  return (
    <div className={styles.article}>
      <div className={styles.heading}>
        {mainImage?.leadImage && (
          <Image
            src={mainImage.leadImage.src}
            alt={mainImage.leadImage.alt}
            className={styles.image}
          />
        )}
        <div className={styles.ribbon}>
          <Container>
            <Grid container spacing={1} alignItems="center">
              {author && (
                <Grid item xs>
                  <small>Author:</small>
                  <Text className={styles.text}>{author}</Text>
                </Grid>
              )}
              {heading && (
                <Box clone order={{ xs: 3, md: 2 }}>
                  <Grid item xs={12} md={8}>
                    <h4 className={styles.header}>{heading}</h4>
                  </Grid>
                </Box>
              )}
              {date && (
                <Box clone order={{ xs: 2, md: 3 }}>
                  <Grid item xs className={styles.date}>
                    <small>Posted:</small>
                    <Date
                      date={date}
                      locale={'pl-Pl'}
                      className={styles.text}
                    />
                  </Grid>
                </Box>
              )}
            </Grid>
          </Container>
        </div>
      </div>

      <div className={styles.content}>
        <Container>
          {body && <FormattedText texts={body} limit={150} />}
        </Container>
      </div>
    </div>
  );
};

export default Article;
