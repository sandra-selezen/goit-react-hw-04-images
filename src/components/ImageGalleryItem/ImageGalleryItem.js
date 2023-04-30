import PropTypes from 'prop-types';
import { Component } from "react";
import { ImageModal } from "components/Modal/Modal"
import { GalleryImage } from "./ImageGalleryItem.styled"

export class ImageGalleryItem extends Component {
  state = {
    selectedImg: null,
  }

  setSelectedImg = () => {
    this.setState({ selectedImg: this.props.picture.largeImageURL });
  }

  closeModal = () => {
    this.setState({ selectedImg: null });
  }

  render() {
    const { webformatURL } = this.props.picture;
    const { selectedImg } = this.state;
    return (
      <>
        <GalleryImage src={webformatURL} onClick={this.setSelectedImg} />
        <ImageModal isOpen={selectedImg !== null} onClose={this.closeModal} image={selectedImg} />
      </>
    )
  }
}

ImageGalleryItem.propTypes = {
  picture: PropTypes.shape({
    webformatURL: PropTypes.string,
    largeImageURL: PropTypes.string,
  }).isRequired
}