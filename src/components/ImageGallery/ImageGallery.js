import '../../styles.css';
import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';

const ImageGallery = ({ images, onImageClick }) => (
  <ul className="ImageGallery">
    {images.map(({ id, tags, webformatUrl, largeImgUrl }) => (
      <ImageGalleryItem
        key={id}
        id={id}
        tags={tags}
        webformatUrl={webformatUrl}
        largeImgUrl={largeImgUrl}
        onImageClick={onImageClick}
      />
    ))}
  </ul>
);

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      tags: PropTypes.string.isRequired,
      webformatUrl: PropTypes.string.isRequired,
      largeImgUrl: PropTypes.string.isRequired,
    })
  ).isRequired,
  onImageClick: PropTypes.func.isRequired,
};

export default ImageGallery;
