import React, { FunctionComponent } from 'react';

interface Props {
  date: Date;
  locale?: string;
  className?: string;
}

const DateField: FunctionComponent<Props> = ({
  date,
  locale,
  className,
}: Props) => {
  const formattedDate = date.toLocaleDateString(locale);

  return (
    <p data-testid="date" className={className}>
      {formattedDate}
    </p>
  );
};
DateField.defaultProps = {
  locale: 'en-Us',
};

export default DateField;
