import { ElementResolver, ElementResolverType } from './elementResolver';
import { Element } from '../../../models/element';
import { Asset } from '../../../models/asset';

export class ImageResolver implements ElementResolver<Asset> {
  public readonly type = ElementResolverType.IMAGE;

  resolve(element: Partial<Element>): Asset {
    if (element.elementType !== this.type) {
      return;
    }

    if (!element.asset) {
      return {
        src: '',
        alt: '',
      };
    }

    return {
      src: process.env.REACT_APP_API_BASE_URL + element.asset.resourceUri,
      alt: element.asset.altText,
    };
  }
}
