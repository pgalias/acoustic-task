import React, { FunctionComponent } from 'react';
import styles from './image.module.scss';

interface Props {
  src: string;
  alt: string;
}

const FormattedText: FunctionComponent<Props> = ({ src, alt }: Props) => {
  const asset = process.env.REACT_APP_API_BASE_URL + src;

  return (
    <div data-testid="image-container" className={styles.container}>
      {src && <img className={styles.image} src={asset} alt={alt} />}
    </div>
  );
};

export default FormattedText;
