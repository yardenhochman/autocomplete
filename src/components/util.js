import axios from 'axios';
import { debounce } from 'lodash';

export const fetchSearchOptionsAutocomplete = searchText =>
  axios.get(`http://localhost:5000/search?q=${searchText}`);

export const includesText = searchText => entry =>
  entry.term.toLowerCase().includes(searchText.toLowerCase());

export const whenEnterIsPressed = fn => ({ which }) => which === 13 && fn();

export const fetcher = setResults =>
  debounce(async value => {
    const { data: listOfTermObjects } = await fetchSearchOptionsAutocomplete(value);
    setResults(listOfTermObjects.filter(includesText(value)));
  }, 300);
