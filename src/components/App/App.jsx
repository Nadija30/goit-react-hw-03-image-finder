import { Component } from 'react';
import { Searchbar } from '../Searchbar/Searchbar';
import { ToastContainer } from 'react-toastify';
import { searchPhoto } from '../ImageInfo/image';
import { toast } from 'react-toastify';
import { ImageGalery } from '../ImageGallery/ImageGallery';
import { Button } from '../Button/Button';
import 'react-toastify/dist/ReactToastify.css';
import css from './App.module.css';

export class App extends Component {
  state = {
    isloading: false,
    photos: null,
    photoName: '',
    page: 1,
    btnLoadMore: false,
  };

  componentDidUpdate(_, prevState) {
    const { photoName, page } = this.state;
    if (photoName !== prevState.searchValue || page !== prevState.page) {
      this.setState({ isLoader: true });

      searchPhoto(photoName, page)
        .then(response => {
          if (!response.ok) {
            throw new Error(response.status);
          }
          return response.json();
        })
        .then(data => {
          if (!data.totalHits) {
            toast.warning(
              `"${photoName}" not found. Please enter something else.`
            );
            return;
          }
          const lastPage = Math.ceil(data.totalHits / 12);

          if (page === lastPage) {
            this.setState({ isLoadBtn: true });
            toast.info('No more images');
          }
          this.setState(prev => ({ photos: [...prev.photos, ...data.photos] }));
        })
        .catch(error => {
          console.log(error);
          return toast.error('Something went wrong. Please try again later.');
        })
        .finally(() => {
          this.setState({ isLoader: false });
        });
    }
  }

  onSubmitForm = value => {
    this.setState({
      photoName: value,
      page: 1,
      photos: [],
      btnLoadMore: false,
    });
  };

  handleLoadMore = () => {
    this.setState(prev => ({ page: prev.page + 1 }));
  };

  render() {
    const { isloading, photos, btnLoadMore } = this.state;
    const showLoadBtn = photos && photos.length > 0 && !btnLoadMore;
    return (
      <div className={css.app}>
        <Searchbar onSubmit={this.onSubmitForm} />
        {isloading && <h1>Loading...</h1>}
        {photos && <ImageGalery photos={photos} />}
        {showLoadBtn && <Button onClick={() => this.handleLoadMore()} />}
        <ToastContainer autoClose={3000} />
      </div>
    );
  }
}
