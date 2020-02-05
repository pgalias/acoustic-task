import React, { FunctionComponent } from 'react';
import styles from './jumbotron.module.scss';

interface Props {
  backgroundImage?: string;
  backgroundColor?: string;
  children: React.ReactNode;
}

const Jumbotron: FunctionComponent<Props> = ({
  backgroundColor,
  backgroundImage,
  children,
}: Props) => {
  return (
    <div
      className={styles.jumbotron}
      style={{
        backgroundColor: backgroundColor,
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      {children}
    </div>
  );
};

export default Jumbotron;
