import React, { FunctionComponent } from 'react';
import styles from './date.module.scss';
import { isDate } from '../../../utils/helpers/date.helper';

interface Props {
  date: string;
  locale?: string;
}

const DateField: FunctionComponent<Props> = ({ date, locale }: Props) => {
  if (!isDate(date)) {
    throw new TypeError(`DateField: Passed date (${date}) is invalid.`);
  }

  const formattedDate = new Date(date).toLocaleDateString(locale);

  return (
    <p data-testid="date" className={styles.date}>
      {formattedDate}
    </p>
  );
};
DateField.defaultProps = {
  locale: 'en-Us',
};

export default DateField;
