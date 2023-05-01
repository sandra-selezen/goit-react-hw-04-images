import PropTypes from 'prop-types';
import { useState } from "react";
import { ImageModal } from "components/Modal/Modal"
import { GalleryImage } from "./ImageGalleryItem.styled"

export const ImageGalleryItem = ({ picture }) => {
  const [selectedImg, setSelectedImg] = useState(null);

  const onSelectedImg = () => {
    setSelectedImg(picture.largeImageURL);
  }

  const closeModal = () => {
    setSelectedImg(null);
  }

  return (
    <>
      <GalleryImage src={picture.webformatURL} onClick={onSelectedImg} />
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