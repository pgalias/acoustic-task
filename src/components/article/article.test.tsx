import React from 'react';
import { render } from '@testing-library/react';
import Article from './article';
import { Article as ArticleModel } from '../../models/article';

test('it should render article with given Article object', () => {
  const article: ArticleModel = {
    id: 'foo',
    heading: 'Im so heady',
    body: ['<p>Im</p>', '<p>so</p>', '<p>body</p>'],
    date: new Date(),
    author: 'Im so authory',
    mainImage: {
      leadImage: {
        src: 'img.jpg',
        alt: 'Im so alty',
      },
      leadImageCredit: 'Im so credity',
      leadImageCaption: 'Im so captiony',
    },
  };

  const { getByTestId } = render(<Article article={article} />);
  const container = getByTestId('article');
  const image = container.querySelector('img.image');
  const header = container.querySelector('[data-testid="heading"]');
  const body = container.querySelector(
    '[data-testid="formatted-text-container"]',
  );
  const date = container.querySelector('[data-testid="date"]');
  const author = container.querySelector('[data-testid="author"]');

  expect(image.getAttribute('src')).toBe('img.jpg');
  expect(image.getAttribute('alt')).toBe(article.mainImage.leadImage.alt);
  expect(header.textContent).toBe('Im so heady');
  expect(body.textContent).toBe('Imsobody');
  expect(date.textContent).toBe('Posted:2020-2-5');
  expect(author.textContent).toBe('Author:Im so authory');
});

test('it should not render anything when article has all empty properties', () => {
  // @ts-ignore
  const article: ArticleModel = {
    heading: undefined,
    body: null,
    date: undefined,
    author: null,
  };

  const { getByTestId } = render(<Article article={article} />);

  expect(getByTestId('article').innerHTML).toBe('');
});
