import PropTypes from 'prop-types';

import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { StyledGallery } from './ImageGalleryStyled';

export function ImageGallery({ images })  {
                console.log(images);

    return (
      <>
        <StyledGallery>
          {images.map(el => {
            return <ImageGalleryItem item={el} key={el.id} />;
          })}
        </StyledGallery>
      </>
    );
  }

ImageGallery.propTypes = {
  query: PropTypes.string.isRequired,
  page: PropTypes.number,
};
