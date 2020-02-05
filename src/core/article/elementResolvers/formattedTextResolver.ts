import { ElementResolver, ElementResolverType } from './elementResolver';
import { Element } from '../../../models/element';

export class FormattedTextResolver implements ElementResolver<string[]> {
  public readonly type = ElementResolverType.FORMATTED_TEXT;

  resolve(element: Partial<Element>): string[] {
    if (element.elementType !== this.type) {
      return;
    }

    return element.values;
  }
}
