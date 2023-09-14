import { Component } from 'react';
import { Searchbar } from '../Searchbar/Searchbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import css from './App.module.css';
export class App extends Component {
  state = {
    photoName: '',
  };

  onSubmitForm = value => {
    this.setState({ photoName: value });
  };

  render() {
    return (
      <div className={css.app}>
        <Searchbar onSubmit={this.onSubmitForm} />
        <ToastContainer autoClose={3000} />
      </div>
    );
  }
}
