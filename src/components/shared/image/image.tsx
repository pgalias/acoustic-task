import React, { FunctionComponent } from 'react';
import styles from './image.module.scss';

interface Props {
  src: string;
  alt: string;
  imageClassName?: string;
  containerClassName?: string;
}

const Image: FunctionComponent<Props> = ({
  src,
  alt,
  imageClassName,
  containerClassName,
}: Props) => {
  return (
    <div data-testid="image-container" className={containerClassName}>
      {src && (
        <img
          className={`${styles.image} ${imageClassName}`}
          src={src}
          alt={alt}
        />
      )}
    </div>
  );
};

export default Image;
