import React from 'react';
import { render } from '@testing-library/react';
import Text from './text';

test('it should render text tag', () => {
  const { getByTestId } = render(<Text>Foo</Text>);

  expect(getByTestId('text').innerHTML).toBe('Foo');
});
