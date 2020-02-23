import axios from 'axios';

export const fetchSearchOptionsAutocomplete = searchText =>
  axios.get(`http://localhost:5000/search?q=${searchText}`);

export const includesText = searchText => entry =>
  entry.term.toLowerCase().includes(searchText.toLowerCase());

export const whenEnterIsPressed = fn => ({ which }) => which === 13 && fn();
