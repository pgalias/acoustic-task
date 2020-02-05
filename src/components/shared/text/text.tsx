import React, { FunctionComponent } from 'react';

interface Props {
  children: React.ReactNode;
  className?: string;
}

const Text: FunctionComponent<Props> = ({ children, className }: Props) => {
  return (
    <p data-testid="text" className={className}>
      {children}
    </p>
  );
};

export default Text;
