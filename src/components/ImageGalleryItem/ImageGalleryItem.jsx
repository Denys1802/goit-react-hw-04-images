import PropTypes from 'prop-types';
import { useState } from 'react';
import { GalleryImg, GalleryItem } from './ImageGalleryItem.styled';
import Modal from '../Modal/Modal';

const ImageGalleryItem = ({ webformatURL, tags, largeImageURL }) => {
  const [showModal, setShowMOdal] = useState(false);

  const toggleModal = () => {
    setShowMOdal(!showModal);
  };

  return (
    <GalleryItem>
      <GalleryImg src={webformatURL} alt={tags} onClick={toggleModal} />
      {showModal && (
        <Modal onModalClick={toggleModal}>
          <img src={largeImageURL} alt={tags} />
        </Modal>
      )}
    </GalleryItem>
  );
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};
