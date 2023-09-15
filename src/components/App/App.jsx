import { Component } from 'react';
import { Searchbar } from '../Searchbar/Searchbar';
import { ToastContainer } from 'react-toastify';
import { searchPhoto } from '../ImageInfo/image';
import { toast } from 'react-toastify';
import { ImageGalery } from '../ImageGallery/ImageGallery';
import 'react-toastify/dist/ReactToastify.css';
import css from './App.module.css';

const perPage = 12;
export class App extends Component {
  state = {
    isloading: false,
    error: null,
    photos: [],
    photoName: '',
    page: 1,
    btnLoadMore: false,
  };

  componentDidUpdate(_, prevState) {
    const newPhotoName = this.state;
    const newPage = this.state;
    const prevPhotoName = prevState;
    const prevPage = prevState;
    if (prevPhotoName !== newPhotoName || prevPage !== newPage) {
      this.addPhotoPage(newPhotoName, newPage);
    }
  }

  addPhotoPage = (photoName, page) => {
    this.setState({ loading: true });

    searchPhoto(photoName, page, perPage)
      .then(data => {
        const { totalHits } = data;
        const totalPage = Math.ceil(data.totalHits / perPage);
        if (totalHits === 0) {
          return toast.warn(
            'Вибачте, немає зображень, які відповідають вашому пошуковому запиту. Будь ласка спробуйте ще раз.'
          );
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

        if (totalPage > page) {
          this.setState({ btnLoadMore: true });
        } else {
          toast.info('Вибачте, але ви досягли кінця результатів пошуку.');
          this.setState({ btnLoadMore: false });
        }
      })
      .catch(error => this.setState({ error }))
      .finally(() => {
        this.setState({ isloading: false });
      });
  };

  onSubmitForm = value => {
    this.setState({ photoName: value });
  };

  render() {
    const { error, isloading, photos } = this.state;
    return (
      <div className={css.app}>
        {error && (
          <h1>
            'Ой! Щось пішло не так! Спробуйте перезавантажити сторінку або
            зробіть інший вибір!'
          </h1>
        )}
        <Searchbar onSubmit={this.onSubmitForm} />
        {isloading && <h1>Loading...</h1>}
        {photos && <ImageGalery photos={photos} />}
        <ToastContainer autoClose={3000} />
      </div>
    );
  }
}
