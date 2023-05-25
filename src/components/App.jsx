import '../styles.css';
import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import fetchImages from './api-services/api-services';

class App extends Component {
  state = {
    images: [],
    currentPage: 1,
    searchQuery: '',
    isLoading: false,
    showModal: false,
    largeImage: '',
    error: null,
    selectedImage: null,
  };

  onChangeQuery = query => {
    this.setState({
      images: [],
      currentPage: 1,
      searchQuery: query,
      error: null,
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.getImages();
    }
  }
  getImages = async () => {
    const { currentPage, searchQuery } = this.state;

    this.setState({
      isLoading: true,
    });

    try {
      // const response = await axios.get(
      //   `https://pixabay.com/api/?q=${searchQuery}&page=${currentPage}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
      // );

      // const { hits } = response.data;
      const { hits } = await fetchImages(searchQuery, currentPage, 12);

      if (hits.length === 0) {
        throw new Error('No images found. Please enter a different query.');
      }

      this.setState(prevState => ({
        images: [...prevState.images, ...hits],
        currentPage: prevState.currentPage + 1,
        error: null,
      }));
      if (currentPage !== 1) {
        this.scrollOnLoadButton();
      }
    } catch (error) {
      console.log('Something went wrong with fetching images:', error);
      this.setState({ error });
    } finally {
      this.setState({
        isLoading: false,
      });
    }
  };

  handleGalleryItem = fullImageUrl => {
    this.setState({
      largeImage: fullImageUrl,
      showModal: true,
    });
  };

  incrementPage = () => {
    this.setState(
      prevState => ({
        currentPage: prevState.currentPage + 1,
      }),
      this.getImages
    );
  };

  openModal = selectedImage => {
    this.setState({ showModal: true, selectedImage });
  };

  closeModal = () => {
    this.setState({ showModal: false, largeImage: '' });
  };

  scrollOnLoadButton = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  render() {
    const { images, isLoading, showModal, largeImage, error } = this.state;
    const needToShowLoadMore = images.length > 0 && images.length >= 12;

    return (
      <div className="App">
        <Searchbar onSearch={this.onChangeQuery} />

        {images.length < 1 && (
          <div>
            <h2>The gallery is empty</h2>
          </div>
        )}

        <ImageGallery images={images} onImageClick={this.handleGalleryItem} />

        {needToShowLoadMore && <Button onClick={this.incrementPage} />}
        {showModal && (
          <Modal largeImageURL={largeImage} onClose={this.closeModal} />
        )}

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
  }
}

export default App;
