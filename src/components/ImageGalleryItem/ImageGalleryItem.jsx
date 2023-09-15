// import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';
export const ImageGalleryItem = ({
  id,
  smallUrl,
  tags,
  onClickImageItem,
  largeImage,
}) => {
  const onImageClick = () => {
    onClickImageItem({ src: largeImage, alt: tags });
  };
  return (
    <li
      className={css.galleryItem}
      key={id}
      data-id={id}
      onClick={onImageClick}
    >
      <img className={css.imageGaleryItem} src={smallUrl} alt={tags} />
    </li>
  );
};
