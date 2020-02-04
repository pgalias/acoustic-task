import { Dictionary } from 'lodash';
import { ArticleFactory } from './articleFactory';
import { ElementResolverAggregate } from './elementResolverAggregate';
import * as resolver from './elementResolvers';
import { ElementResolver } from './elementResolvers/elementResolver';
import { Article, Element } from '../../models/article';

const aggregate = new ElementResolverAggregate();
const factory = new ArticleFactory<Article>(aggregate);
const groupFactory = new ArticleFactory<Dictionary<Element>>(aggregate);

const resolvers: ElementResolver<any>[] = [
  new resolver.ImageResolver(),
  new resolver.DatetimeResolver(),
  new resolver.GroupResolver(groupFactory),
  new resolver.FormattedTextResolver(),
];

resolvers.forEach(resolver => aggregate.addResolver(resolver));

export default factory;
