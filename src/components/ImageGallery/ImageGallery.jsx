// import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';

import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';

export const ImageGalery = ({ photos, onClickImageItem }) => (
  <ul className={css.imageGalleryList}>
    {photos.map(({ id, webformatURL, tags }) => (
      <ImageGalleryItem
        key={id}
        tags={tags}
        smallUrl={webformatURL}
        onClickImageItem={onClickImageItem}
      />
    ))}
  </ul>
);
