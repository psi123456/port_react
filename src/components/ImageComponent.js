// ImageComponent.js
import React from 'react';

const ImageComponent = ({ imageData }) => {
  return (
    <div>
      {/* 이미지 출력 */}
      {imageData && <img src={imageData.imageUrl} alt="Image" />}
    </div>
  );
};

export default ImageComponent;
