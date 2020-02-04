import React from 'react';
import { render } from '@testing-library/react';
import FormattedText from './formattedText';

test('it should render given array of strings as HTML tags', () => {
  const texts = ['<p>Foo</p>', '<span>Bar</span>'];
  const { getByTestId } = render(<FormattedText texts={texts} />);
  const container = getByTestId('formatted-text-container');

  expect(container.childElementCount).toBe(2);
  expect(container.innerHTML).toBe('<p>Foo</p><span>Bar</span>');
});

test('it should render empty container when given array is empty', () => {
  const { getByTestId } = render(<FormattedText texts={[]} />);
  const container = getByTestId('formatted-text-container');

  expect(container.childElementCount).toBe(0);
  expect(container.innerHTML).toBe('');
});
