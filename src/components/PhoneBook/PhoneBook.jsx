import { Component } from 'react';
import { nanoid } from 'https://cdn.jsdelivr.net/npm/nanoid/nanoid.js';
import PhoneBookForm from './PhoneBookForm';
import { PhoneBookList } from './PhoneBookList';
import css from './PhoneBook.module.css';

class PhoneBook extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
    name: '',
    number: '',
  };

  isDublicate({ name, number }) {
    const { contacts } = this.state;
    const normalizedName = name.toLowerCase();

    const dublicate = contacts.find(item => {
      const normalizedCurrentName = item.name.toLowerCase();
      const currentNumber = item.number;
      return (
        normalizedCurrentName === normalizedName && currentNumber === number
      );
    });

    return Boolean(dublicate);
  }

  addContact = data => {
    if (this.isDublicate(data)) {
      return alert(
        `Contact with name ${data.name} and number ${data.number} already in list`
      );
    }

    this.setState(({ contacts }) => {
      const newContact = {
        id: nanoid(4),
        ...data,
      };

      return {
        contacts: [...contacts, newContact],
      };
    });
  };

  deleteContact = id => {
    this.setState(({ contacts }) => {
      const newContacts = contacts.filter(item => item.id !== id);

      return {
        contacts: newContacts,
      };
    });
  };

  changeFitler = ({ target }) => {
    this.setState({
      filter: target.value,
    });
  };

  getFilteredContacts() {
    const { filter, contacts } = this.state;
    if (!filter) {
      return contacts;
    }

    const normalizedFilter = filter.toLowerCase();

    const filteredContacts = contacts.filter(({ name, number }) => {
      const normalizedName = name.toLowerCase();

      return (
        normalizedName.includes(normalizedFilter) ||
        number.includes(normalizedFilter)
      );
    });

    return filteredContacts;
  }

  render() {
    const contacts = this.getFilteredContacts();
    const { addContact, deleteContact, changeFitler } = this;
    return (
      <div>
        <PhoneBookForm onSubmit={addContact} />
        <div>
          <input
            onChange={changeFitler}
            name="filter"
            placeholder="Find contact"
            className={css.filterInput}
          />
          <PhoneBookList items={contacts} deleteContact={deleteContact} />
        </div>
      </div>
    );
  }
}

export default PhoneBook;
