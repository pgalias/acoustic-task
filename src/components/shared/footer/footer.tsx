import React, { FunctionComponent } from 'react';
import { Container, Divider } from '@material-ui/core';
import styles from './footer.module.scss';
import Text from '../text';

const Footer: FunctionComponent<{}> = () => (
  <Container>
    <Divider variant="middle" />
    <Text className={styles.footer}>
      Created by&nbsp;
      <a
        href="https://github.com/pgalias"
        target="_blank"
        ref="noopener noreferrer"
      >
        Paweł Galias
      </a>
    </Text>
  </Container>
);

export default Footer;
