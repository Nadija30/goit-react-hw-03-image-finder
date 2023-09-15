// import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';
export const ImageGalleryItem = ({ id, smallUrl, tags, onClickImageItem }) => (
  <li
    className={css.galleryItem}
    key={id}
    data-id={id}
    onClick={onClickImageItem}
  >
    <img
      className={css.imageGaleryItem}
      src={smallUrl}
      alt={tags}
      data-id={id}
    />
  </li>
);
