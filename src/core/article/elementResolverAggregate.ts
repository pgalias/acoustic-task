import { Element } from '../../models/element';
import { ElementResolver } from './elementResolvers/elementResolver';

export class ElementResolverAggregate {
  private resolvers: ElementResolver<any>[] = [];

  resolve(element: Partial<Element>) {
    for (const resolver of this.resolvers) {
      const resolved = resolver.resolve(element);

      if (resolved) {
        return resolved;
      }
    }

    return element.value;
  }

  addResolver(resolver: ElementResolver<any>): void {
    this.resolvers.push(resolver);
  }
}
