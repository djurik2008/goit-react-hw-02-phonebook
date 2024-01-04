import React, { Component } from 'react';

class PhoneBook extends Component {
  state = {
    contacts: [],
    name: '',
  };

  render() {
    return (
      <form>
        <input type="text"></input>
      </form>
    );
  }
}

export default PhoneBook;
