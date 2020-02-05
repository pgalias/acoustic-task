import { Dictionary } from 'lodash';

export type ElementValue = string | Dictionary<Element>;

export interface Element {
  elementType: string;
  value: ElementValue;
  values: string[];
  asset: { altText: string; resourceUri: string };
}
