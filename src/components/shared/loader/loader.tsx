import React, { FunctionComponent } from 'react';
import styles from './loader.module.scss';

const Loader: FunctionComponent<{}> = () => (
  <div className={styles.loader}>Loading...</div>
);

export default Loader;
