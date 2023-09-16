import React, { Component } from 'react';
import { Searchbar } from '../Searchbar/Searchbar';
import { ToastContainer } from 'react-toastify';
import { searchPhoto } from '../ImageInfo/image';
import { toast } from 'react-toastify';
import { ImageGalery } from '../ImageGallery/ImageGallery';
import { Button } from '../Button/Button';
import { Modal } from '../Modal/Modal';
import { Loader } from '../Loader/Loader';
import 'react-toastify/dist/ReactToastify.css';
import css from './App.module.css';

export class App extends Component {
  state = {
    isloading: false,
    photos: [],
    photoName: '',
    page: 1,
    btnLoadMore: false,
    selectedPhoto: null,
  };

  componentDidUpdate(_, prevState) {
    const { photoName, page } = this.state;
    if (photoName !== prevState.photoName || page !== prevState.page) {
      this.setState({ isloading: true });

      searchPhoto(photoName, page)
        .then(response => {
          if (!response.ok) {
            throw new Error(response.status);
          }
          return response.json();
        })
        .then(data => {
          if (data.totalHits === 0) {
            toast.warning(
              'Вибачте, немає зображень, які відповідають вашому пошуковому запиту. Будь ласка спробуйте ще раз.'
            );
            return;
          }
          const totalPage = Math.ceil(data.totalHits / 12);

          if (totalPage > page) {
            this.setState({ btnLoadMore: true });
          } else {
            toast.info('Вибачте, але ви досягли кінця результатів пошуку.');
            this.setState({ btnLoadMore: false });
          }
          const arrPhotos = data.hits.map(
            ({ id, webformatURL, largeImageURL, tags }) => ({
              id,
              webformatURL,
              largeImageURL,
              tags,
            })
          );

          this.setState(prevState => ({
            photos: [...prevState.photos, ...arrPhotos],
          }));
        })
        .catch(error => {
          console.log(error);
          return toast.error(
            'Щось пішло не так. Будь-ласка спробуйте пізніше.'
          );
        })
        .finally(() => {
          this.setState({ isloading: false });
        });
    }
  }

  onSubmitForm = value => {
    if (value === this.state.photoName) {
      toast.info('Будь ласка, введіть новий запит!');
      return;
    }
    this.setState({
      photoName: value,
      page: 1,
      photos: [],
      btnLoadMore: false,
    });
  };

  onClickRender = () => {
    this.setState(prev => ({ page: prev.page + 1 }));
  };

  toggleModal = (selectedPhoto = null) => {
    this.setState({ selectedPhoto });
  };
  render() {
    const { isloading, photos, btnLoadMore, selectedPhoto } = this.state;
    return (
      <div className={css.app}>
        <Searchbar onSubmit={this.onSubmitForm} />
        {isloading && <Loader />}
        <ImageGalery photos={photos} onClickImageItem={this.toggleModal} />
        {photos.length !== 0 && btnLoadMore && (
          <Button onClickRender={this.onClickRender} />
        )}
        {selectedPhoto && (
          <Modal selectedPhoto={selectedPhoto} onClose={this.toggleModal} />
        )}
        <ToastContainer autoClose={3000} />
      </div>
    );
  }
}
