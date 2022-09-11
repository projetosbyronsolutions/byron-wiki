import { defaultProps } from 'prism-react-renderer';
import React from 'react';
import styles from './Video.module.css';

interface VideoProps {
  src: string;
}

const VideoIframe = ({ src }: VideoProps) => {
  return (
    <div className={styles.container}>
        <iframe className={styles.responsive} src={src} allowFullScreen></iframe>
    </div>
  );
};

export default VideoIframe;