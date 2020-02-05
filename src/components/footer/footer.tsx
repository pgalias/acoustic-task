import React, { FunctionComponent } from 'react';
import { Container, Divider } from '@material-ui/core';
import styles from './footer.module.scss';
import Text from '../shared/text';

const Footer: FunctionComponent<{}> = () => (
  <Container className={styles.footer}>
    <Divider variant="middle" className={styles.divider} />
    <Text>
      Created by&nbsp;
      <a
        href="https://github.com/pgalias"
        target="_blank"
        rel="noopener noreferrer"
      >
        Paweł Galias
      </a>
    </Text>
  </Container>
);

export default Footer;
