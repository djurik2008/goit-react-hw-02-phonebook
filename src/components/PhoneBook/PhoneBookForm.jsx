import { Component } from 'react';
import css from './PhoneBookForm.module.css';

const INITIAL_STATE = {
  name: '',
  number: '',
};

const TEXT_PATTERN =
  "^[a-zA-Zа-яА-Я]+(([' \\-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$";

const PHONE_PATTERN =
  '\\+?\\d{1,4}?[ .\\-\\s]?\\(?\\d{1,3}?\\)?[ .\\-\\s]?\\d{1,4}[ .\\-\\s]?\\d{1,4}[ .\\-\\s]?\\d{1,9}';

class PhoneBookForm extends Component {
  state = { ...INITIAL_STATE };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value.trim(),
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit({ ...this.state });
    this.reset();
  };

  reset() {
    this.setState({ ...INITIAL_STATE });
  }

  render() {
    const { handleChange, handleSubmit } = this;
    const { name, number } = this.state;
    return (
      <form className={css.form} onSubmit={handleSubmit}>
        <label className={css.label}>
          Name
          <input
            type="text"
            className={css.input}
            pattern={TEXT_PATTERN}
            name="name"
            onChange={handleChange}
            value={name}
            required
          ></input>
        </label>
        <label className={css.label}>
          Number
          <input
            type="phone"
            className={css.input}
            pattern={PHONE_PATTERN}
            name="number"
            onChange={handleChange}
            value={number}
            required
          ></input>
        </label>
        <button type="submit" className={css.button}>
          Add contact
        </button>
      </form>
    );
  }
}

export default PhoneBookForm;
