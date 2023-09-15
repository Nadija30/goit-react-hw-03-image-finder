// import PropTypes from 'prop-types';
import css from './Searchbar.module.css';
import { Component } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export class Searchbar extends Component {
  state = {
    value: '',
  };

  handleChange = ({ target: { value } }) => {
    this.setState({ value });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.value.trim() === '') {
      toast.info('Введіть свій запит, будь ласка!');
      return;
    }
    this.props.onSubmit(this.state.value);
    this.reset();
  };

  reset = () =>
    this.setState({
      value: '',
    });

  render() {
    const { value } = this.state;
    return (
      <div className={css.searchbar}>
        <form className={css.form} onSubmit={this.handleSubmit}>
          <input
            className={css.form_input}
            type="text"
            onChange={this.handleChange}
            value={value}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
          <button type="submit" className={css.form_button}>
            <span>Search</span>
          </button>
        </form>
      </div>
    );
  }
}
