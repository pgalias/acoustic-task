import { Dictionary } from 'lodash';
import { ElementResolver, ElementResolverType } from './elementResolver';
import { Element } from '../../../models/article';
import { ArticleFactory } from '../articleFactory';

export class GroupResolver implements ElementResolver<Dictionary<Element>> {
  public readonly type = ElementResolverType.GROUP;

  constructor(private articleFactory: ArticleFactory) {}

  resolve(element: Element): Dictionary<Element> {
    if (element.elementType !== this.type) {
      return;
    }

    return this.articleFactory.create(element.value as Dictionary<Element>);
  }
}
