import React, { FunctionComponent } from 'react';
import styles from './text.module.scss';

interface Props {
  children: string;
}

const Text: FunctionComponent<Props> = ({ children }: Props) => {
  return (
    <p data-testid="text" className={styles.text}>
      {children}
    </p>
  );
};

export default Text;
