import { Dictionary } from 'lodash';

export interface Element {
  elementType: string;
  value: ElementValue;
  asset?: { altText: string; resourceUri: string };
}

export interface Asset {
  alt: string;
  src: string;
}

export type ElementValue = string | string[] | Dictionary<Element>;

export interface Article {
  [key: string]: string | string[] | Date | Asset;
}
