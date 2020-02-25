import { debounce } from 'lodash';
import axios from 'axios';

const fetchSearchOptionsAutocomplete = searchText =>
  axios.get(`http://localhost:5000/search?q=${searchText}`);

const includesText = searchText => entry =>
  entry.term.toLowerCase().includes(searchText.toLowerCase());

export const suggestionFetcher = setResults =>
  debounce(async value => {
    const { data: listOfTermObjects } = await fetchSearchOptionsAutocomplete(value);
    setResults(listOfTermObjects.filter(includesText(value)));
  }, 300);

export default suggestionFetcher;
