import { Element } from '../../../models/article';

export enum ElementResolverType {
  DATETIME = 'datetime',
  GROUP = 'group',
  IMAGE = 'image',
  FORMATTED_TEXT = 'formattedtext',
}

export interface ElementResolver<T> {
  type: ElementResolverType;
  resolve(element: Partial<Element>): T;
}
