import React from 'react';

interface ImageProps {
  src: string;
  alt: string;
  hideLegend?: boolean;
}

const Image = ({ src, alt, hideLegend }: ImageProps) => {
  return (
    <div style={{ textAlign: 'center', maxWidth: 600 + 'px', marginInline: 'auto' }}>
      <img src={src} alt={alt} />
      {!hideLegend && <span style={{ fontSize: 12 + 'px' }}>{alt}</span>}
    </div>
  );
};

export default Image;
