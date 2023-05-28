import React from 'react';
import '../../styles.css';

const ImageGalleryItem = ({
  id,
  tags,
  webformatUrl,
  largeImgUrl,
  onImageClick,
}) => {
  const handleClick = () => {
    onImageClick(largeImgUrl);
  };

  return (
    <li className="ImageGalleryItem">
      <img
        src={webformatUrl}
        alt={tags}
        className="ImageGalleryItem-image"
        onClick={handleClick}
      />
    </li>
  );
};

export default ImageGalleryItem;
