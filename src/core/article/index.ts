import { ArticleFactory } from './articleFactory';
import { ElementResolverAggregate } from './elementResolverAggregate';
import * as resolver from './elementResolvers';
import { ElementResolver } from './elementResolvers/elementResolver';

const aggregate = new ElementResolverAggregate();
const factory = new ArticleFactory(aggregate);

const resolvers: ElementResolver<any>[] = [
  new resolver.ImageResolver(),
  new resolver.DatetimeResolver(),
  new resolver.GroupResolver(factory),
  new resolver.FormattedTextResolver(),
];

resolvers.forEach(resolver => aggregate.addResolver(resolver));

export default factory;
