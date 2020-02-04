import { Element } from '../../../models/article';

export enum ElementResolverType {
  DATETIME = 'datetime',
  GROUP = 'group',
  IMAGE = 'image',
}

export interface ElementResolver<T> {
  type: ElementResolverType;
  resolve(element: Element): T;
}
