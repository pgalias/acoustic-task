import React, { FunctionComponent, useEffect, useRef } from 'react';
import styles from './formattedText.module.scss';
import { truncate } from '../../../utils/helpers/string.helper';

interface Props {
  texts: string[];
  limit?: number;
}

const FormattedText: FunctionComponent<Props> = ({ texts, limit }: Props) => {
  const container = useRef(null);

  useEffect(() => {
    if (!limit) {
      return;
    }

    const text = container.current.innerHTML;
    container.current.innerHTML = truncate(text, limit);
  }, []);

  return (
    <div
      data-testid="formatted-text-container"
      ref={container}
      className={styles.container}
      dangerouslySetInnerHTML={{ __html: texts.join('') }}
    />
  );
};

export default FormattedText;
