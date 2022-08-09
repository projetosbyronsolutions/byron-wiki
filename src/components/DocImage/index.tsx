import React from 'react';
import styles from './Image.module.css';

interface ImageProps {
  src: string;
  alt: string;
  hideLegend?: boolean;
  width?: number;
}

const Image = ({ src, alt, hideLegend, width }: ImageProps) => {
  return (
    <div className={styles.wrapper}>
      <img src={src} alt={alt} className={styles.img} style={{ width: width ? width + 'px' : 'unset' }} />
      {!hideLegend && <span className={styles.legend}>{alt}</span>}
    </div>
  );
};

export default Image;
