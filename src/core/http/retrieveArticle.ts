import { Observable } from 'rxjs';
import { get } from '../../utils/http';

// export interface Response {
//   elements: {
//     heading: {}
//   }
//
// }

export function retrieveArticle(id: string): Observable<any> {
  return get(`/delivery/v1/content/${id}`);
}
