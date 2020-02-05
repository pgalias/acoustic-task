import { Asset } from './asset';

export interface Article {
  id: string;
  heading: string;
  author: string;
  date: Date;
  body: string[];
  mainImage: {
    leadImage: Asset;
    leadImageCaption: string;
    leadImageCredit: string;
  };
}
