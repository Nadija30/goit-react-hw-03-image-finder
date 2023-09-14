// import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';
export const ImageGalleryItem = ({ id, smallUrl, tags }) => {
  return (
    <li className={css.imageGalleryItem} key={id} data-id={id}>
      <img
        className={css.galleryImage}
        src={smallUrl}
        alt={tags}
        data-id={id}
      />
    </li>
  );
};

// ImageGalleryItem.propTypes = {
//   id: PropTypes.number.isRequired,
//   webformatURL: PropTypes.string.isRequired,
//   tags: PropTypes.string.isRequired,
//   // onClickImageItem: PropTypes.func.isRequired,
// };
