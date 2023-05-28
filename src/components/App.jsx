import '../styles.css';
import { useState, useEffect } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import fetchImages from './api-services/api-services';

const App = () => {
  const [images, setImages] = useState([]);
  const [currentPage, setPage] = useState(1);
  const [searchQuery, setQuery] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [showModal, setModal] = useState(false);
  const [largeImage, setlargeImage] = useState('');
  const [error, setError] = useState(null);
  const [totalImg, setTotalIng] = useState(null);

  const handleGalleryItem = fullImageUrl => {
    setlargeImage(fullImageUrl);
    setModal(true);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  useEffect(() => {
    const getImages = async () => {
      setLoading(true);
      try {
        const { hits, totalHits } = await fetchImages(
          searchQuery,
          currentPage,
          12
        );
        console.log(totalHits);
        if (hits.length === 0) {
          throw new Error('No images found. Please enter a different query.');
        }

        const transformedHits = hits.map(
          ({ id, tags, webformatURL, largeImageURL }) => ({
            id,
            tags,
            webformatUrl: webformatURL,
            largeImgUrl: largeImageURL,
          })
        );

        setImages(prev => [...prev, ...transformedHits]);
        setError(null);
        setTotalIng(totalHits);
      } catch (error) {
        console.log('Something went wrong with fetching images:', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    if (!searchQuery) return;

    getImages();
  }, [searchQuery, currentPage]);

  const onChangeQuery = query => {
    setImages([]);
    setPage(1);
    setQuery(query);
    setError(null);
  };

  const closeModal = () => {
    setModal(false);
    setlargeImage('');
  };

  const needToShowLoadMore = images.length > 0 && images.length !== totalImg;
  return (
    <div className="App">
      <Searchbar onSearch={onChangeQuery} />

      {images.length < 1 && (
        <div>
          <h2>The gallery is empty</h2>
        </div>
      )}

      <ImageGallery
        images={images.map(({ id, tags, webformatUrl, largeImgUrl }) => ({
          id,
          tags,
          webformatUrl,
          largeImgUrl,
        }))}
        onImageClick={handleGalleryItem}
      />
      {needToShowLoadMore && <Button onClick={handleLoadMore} />}
      {showModal && <Modal largeImageURL={largeImage} onClose={closeModal} />}

      {isLoading && <Loader />}

      {error && (
        <div>
          <h2>Oops!</h2>
          <p>
            Sorry, something went wrong. Please try again, or{' '}
            <a href="/">refresh the page</a>.
          </p>

          {error.message && <p>{error.message}</p>}
        </div>
      )}
    </div>
  );
};

export default App;
