import { every, isNil } from 'lodash';
import { Article } from '../../models/article';

export function hasEnoughPropsToRender(article: Article): boolean {
  const { heading, author, body, date } = article;

  return !every([heading, author, body, date], isNil);
}

export function createArticleStub(article?: Partial<Article>): Article {
  return Object.assign(
    {
      id: '1',
      heading: 'Heading',
      body: ['<p>Body</p>'],
      date: new Date(),
      author: 'Author',
      mainImage: {
        leadImage: {
          src: 'img.jpg',
          alt: 'alt',
        },
        leadImageCaption: 'Caption',
        leadImageCredit: 'Credit',
      },
    },
    article,
  );
}
