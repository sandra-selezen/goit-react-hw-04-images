import PropTypes from 'prop-types';
import { useState } from "react";
import { ImageModal } from "components/Modal/Modal"
import { GalleryImage } from "./ImageGalleryItem.styled"

export const ImageGalleryItem = ({ picture: { webformatURL, largeImageURL, tags } }) => {
  const [selectedImg, setSelectedImg] = useState(null);

  const onSelectedImg = () => {
    setSelectedImg(largeImageURL);
  }

  const closeModal = () => {
    setSelectedImg(null);
  }

  return (
    <>
      <GalleryImage src={webformatURL} onClick={onSelectedImg} alt={tags} />
      <ImageModal isOpen={selectedImg !== null} onClose={closeModal} image={selectedImg} />
    </>
  )
}

ImageGalleryItem.propTypes = {
  picture: PropTypes.shape({
    webformatURL: PropTypes.string,
    largeImageURL: PropTypes.string,
  }).isRequired
}