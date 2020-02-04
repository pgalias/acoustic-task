import React, { FunctionComponent } from 'react';
import styles from './formattedText.module.scss';

interface Props {
  texts: string[];
}

const FormattedText: FunctionComponent<Props> = ({ texts }: Props) => {
  return (
    <div
      data-testid="formatted-text-container"
      className={styles.container}
      dangerouslySetInnerHTML={{ __html: texts.join('') }}
    />
  );
};

export default FormattedText;
