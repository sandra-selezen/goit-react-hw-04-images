import PropTypes from 'prop-types';
import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem"
import { GalleryList } from "./ImageGallery.styled"
import { GalleryItem } from "components/ImageGalleryItem/ImageGalleryItem.styled"

export const ImageGallery = ({ pictures }) => {
  return (
    <GalleryList>
      {pictures.map(picture => (
        <GalleryItem key={picture.id}>
          <ImageGalleryItem picture={picture} />
        </GalleryItem>
      ))}
  </GalleryList>
  )
}

ImageGallery.propTypes = {
  pictures: PropTypes.array.isRequired
}