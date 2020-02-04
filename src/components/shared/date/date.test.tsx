import React from 'react';
import { render } from '@testing-library/react';
import DateField from './date';

describe('Date component', () => {
  let date: Date;
  beforeEach(() => {
    date = new Date('2019-10-20T22:00:00Z');
  });

  test('it should render given date with given locale', () => {
    const { getByTestId } = render(<DateField date={date} locale={'pl-PL'} />);

    expect(getByTestId('date')).toHaveTextContent('2019-10-21');
  });

  test('it should render given date with default locale when is not provided', () => {
    const { getByTestId } = render(<DateField date={date} />);

    expect(getByTestId('date')).toHaveTextContent('10/21/2019');
  });
});
