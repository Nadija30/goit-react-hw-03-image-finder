import { Component } from 'react';
import { Searchbar } from '../Searchbar/Searchbar';
import { ToastContainer } from 'react-toastify';
// import { searchPhoto } from '../ImageInfo/image';
import { ImageGalery } from '../ImageGallery/ImageGallery';
import 'react-toastify/dist/ReactToastify.css';
import css from './App.module.css';
export class App extends Component {
  state = {
    isloading: false,
    error: '',
    photos: [],
    photoName: '',
    page: 1,
  };
  // componentDidUpdate(_, prevState) {
  //   if (
  //     prevState.photoName !== this.state.photoName ||
  //     prevState.page !== this.state.page
  //   ) {
  //     // fetchPhoto(this.state.photoName, this.state.page);
  //   }
  // }
  // fetchPhoto = () => {};
  onSubmitForm = value => {
    this.setState({ photoName: value });
  };

  render() {
    const { error, isloading, photos } = this.state;
    return (
      <div className={css.app}>
        {error && <h1>{error}</h1>}
        <Searchbar onSubmit={this.onSubmitForm} />
        {isloading && <h1>Loading...</h1>}
        {photos && <ImageGalery photo={photos} />}
        {isloading && <h1>Loading...</h1>}
        <ToastContainer autoClose={3000} />
      </div>
    );
  }
}
