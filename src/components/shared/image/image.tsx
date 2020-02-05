import React, { FunctionComponent } from 'react';
import styles from './image.module.scss';

interface Props {
  src: string;
  alt: string;
  className?: string;
}

const FormattedText: FunctionComponent<Props> = ({
  src,
  alt,
  className,
}: Props) => {
  const asset = process.env.REACT_APP_API_BASE_URL + src;

  return (
    <div data-testid="image-container">
      {src && (
        <img className={`${styles.image} ${className}`} src={asset} alt={alt} />
      )}
    </div>
  );
};

export default FormattedText;
