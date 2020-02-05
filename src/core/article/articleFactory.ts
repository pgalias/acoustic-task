import { Dictionary } from 'lodash';
import { flow, fromPairs, map, toPairs } from 'lodash/fp';
import { ElementResolverAggregate } from './elementResolverAggregate';
import { Element } from '../../models/element';

export class ArticleFactory<T> {
  constructor(private resolverAggregate: ElementResolverAggregate) {}

  create(elements: Dictionary<Partial<Element>>): T {
    return flow(
      map(([key, element]): [string, Element] => [
        key,
        this.resolverAggregate.resolve(element),
      ]),
      fromPairs,
    )(toPairs(elements)) as T;
  }
}
