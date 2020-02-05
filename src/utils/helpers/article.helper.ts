import { every, isNil } from 'lodash';
import { Article } from '../../models/article';

export function hasEnoughPropsToRender(article: Article): boolean {
  const { heading, author, body, date } = article;

  return !every([heading, author, body, date], isNil);
}
