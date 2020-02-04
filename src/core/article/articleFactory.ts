import { Dictionary } from 'lodash';
import { flow, toPairs, fromPairs, map } from 'lodash/fp';
import { ElementResolverAggregate } from './elementResolverAggregate';
import { Element } from '../../models/article';

export class ArticleFactory {
  constructor(private resolverAggregate: ElementResolverAggregate) {}

  create(elements: Dictionary<Element>) {
    return flow(
      map(([key, element]): [string, Element] => [
        key,
        this.resolverAggregate.resolve(element),
      ]),
      fromPairs,
    )(toPairs(elements));
  }
}
