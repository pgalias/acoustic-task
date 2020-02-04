import { ElementResolver, ElementResolverType } from './elementResolver';
import { Element } from '../../../models/article';
import { isDate } from '../../../utils/helpers/date.helper';

export class DatetimeResolver implements ElementResolver<Date> {
  public readonly type = ElementResolverType.DATETIME;

  resolve(element: Partial<Element>): Date {
    if (element.elementType !== this.type) {
      return;
    }

    if (!isDate(element.value as string)) {
      return;
    }

    return new Date(element.value as string);
  }
}
