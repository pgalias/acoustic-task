import React from 'react';
import { render } from '@testing-library/react';
import DateField from './date';

test('it should render given date with given locale', () => {
  const { getByTestId } = render(<DateField date={'2019-10-20T22:00:00Z'} locale={'pl-PL'} />);

  expect(getByTestId('date')).toHaveTextContent('2019-10-21');
});

test('it should render given date with default locale when is not provided', () => {
  const { getByTestId } = render(<DateField date={'2019-10-20T22:00:00Z'} />);

  expect(getByTestId('date')).toHaveTextContent('10/21/2019');
});

test('it should throw an error if given date is invalid', () => {
  expect(() => render(<DateField date={'20.10.2019'} />)).toThrowError();
});
