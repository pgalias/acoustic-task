import React, { FunctionComponent } from 'react';
import styles from './date.module.scss';

interface Props {
  date: Date;
  locale?: string;
}

const DateField: FunctionComponent<Props> = ({ date, locale }: Props) => {
  const formattedDate = date.toLocaleDateString(locale);

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
