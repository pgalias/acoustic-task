import React from 'react';
import { render } from '@testing-library/react';
import Image from './image';

test('it should render image with given source path and alt text', () => {
  const { getByTestId } = render(<Image src={'/foo.jpg'} alt={'Foo'} />);
  const container = getByTestId('image-container');
  const child = container.firstChild as HTMLImageElement;

  expect(child.src.includes('/foo.jpg')).toBeTruthy();
  expect(child.alt).toBe('Foo');
});

test('it should not render image when given source path is invalid', () => {
  const { getByTestId } = render(<Image src={''} alt={'Foo'} />);
  const container = getByTestId('image-container');

  expect(container.childElementCount).toBe(0);
});
