import React from 'react';
import { render } from '@testing-library/react';
import Jumbotron from './jumbotron';

describe('Jumbotron component', () => {
  test('it should render props as container class names', () => {
    const { getByTestId } = render(
      <Jumbotron backgroundImage="foo.jpg" backgroundColor="red">
        Foo
      </Jumbotron>,
    );

    const container = getByTestId('jumbotron');

    expect(container.style.backgroundImage).toBe('url(foo.jpg)');
    expect(container.style.backgroundColor).toBe('red');
  });
});
