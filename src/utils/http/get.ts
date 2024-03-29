import { Observable } from 'rxjs';
import http from './config';

export default function<T>(url: string, params?: object): Observable<T> {
  return new Observable(subscriber => {
    http
      .get(url, { params })
      .then(response => {
        subscriber.next(response.data);
        subscriber.complete();
      })
      .catch(error => {
        subscriber.error({
          status: error.response?.status,
          data: error.response?.data,
          message: error.message,
        });
      });
  });
}
