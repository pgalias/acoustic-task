import { Observable } from 'rxjs';
import { map, pluck } from 'rxjs/operators';
import { Dictionary } from 'lodash';
import { get } from '../../utils/http';
import { Element, Article } from '../../models/article';
import articleFactory from '../article';

export interface Response {
  elements: Dictionary<Element>;
}

export function retrieveArticle(id: string): Observable<Article> {
  return get<Response>(`/delivery/v1/content/${id}`).pipe(
    pluck('elements'),
    map((elements: Dictionary<Element>) => articleFactory.create(elements)),
  );
}
