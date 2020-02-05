import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Dictionary } from 'lodash';
import { get } from '../../utils/http';
import { Article } from '../../models/article';
import { Element } from '../../models/element';
import articleFactory from '../article';

export interface Response {
  id: string;
  elements: Dictionary<Element>;
}

export function retrieveArticle(id: string): Observable<Article> {
  return get<Response>(`/delivery/v1/content/${id}`).pipe(
    map(({ id, elements }: Response) => {
      elements['id'] = {
        value: id,
        values: null,
        asset: null,
        elementType: null,
      };
      return articleFactory.create(elements);
    }),
  );
}
