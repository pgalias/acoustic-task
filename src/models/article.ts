import { Dictionary } from 'lodash';

export interface Element {
  elementType: string;
  value: ElementValue;
  values: string[];
  asset: { altText: string; resourceUri: string };
}

export interface Asset {
  alt: string;
  src: string;
}

export type ElementValue = string | Dictionary<Element>;

export interface Article {
  header: string;
  author: string;
  date: Date;
  body: string[];
  mainImage: {
    leadImage: Asset;
    leadImageCaption: string;
    leadImageCredit: string;
  };
}
