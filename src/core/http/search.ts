import { Observable } from 'rxjs';
import { get } from '../../utils/http';

export interface Response {
  numFound: number;
  documents: { id: string }[];
}

export function searchForArticle(
  pageSize: number,
  pageNumber: number,
): Observable<Response> {
  return get('/delivery/v1/search', {
    q: 'type:Article',
    fl: 'id',
    rows: pageSize,
    start: pageSize * pageNumber,
    sort: 'lastModified desc',
  });
}
