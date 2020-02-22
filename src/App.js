import axios from 'axios';
// import { debounce } from 'lodash';
import React from 'react';
import styled from 'styled-components';

const fetchResults = (searchText) =>
  axios.get(`http://localhost:5000/search?q=${searchText}`);

// const includesText = (searchText) => (entry) => entry.term.includes(searchText);

function App() {
  const [searchText, setSearchText] = React.useState('');
  const [results, setResults] = React.useState([]);

  const fetchSuggestions = async () => {
    if (searchText.length > 2) {
      const res = await fetchResults(searchText);
      console.log(res);
      // setResults(fetchSuggestions(value).);
    } else {
      setResults([]);
    }
  };

  const onChange = async ({ target: { value } }) => {
    setSearchText(value);
    fetchSuggestions();
  };

  const showSuggestions = () => null;

  const selectSuggestion = (term) => {
    setSearchText(term);
    setResults([]);
  };

  return (
    <Page>
      <SearchBar
        onChange={onChange}
        value={searchText}
        onKeyUp={showSuggestions}
      />
      {!!results.length && (
        <SuggestionList>
          {results.map(({ resultCount, term }) => (
            <Suggestion key={term} onClick={() => selectSuggestion(term)}>
              <span>{`${term} (${resultCount})`}</span>
            </Suggestion>
          ))}
        </SuggestionList>
      )}
    </Page>
  );
}

export default App;

const SearchBar = styled.input.attrs({
  autocomplete: 'off',
  type: 'text',
  name: 'search',
})`
  width: 200px;
  height: 20px;
  border: gray 1px solid;
  &:focus {
    border: black 1px solid;
  }
`;
const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 25px;
  font-size: 14px;
  box-sizing: border-box;
`;

const Suggestion = styled.li.attrs({
  tabIndex: 0,
})`
  padding: 10px 2px;
  width: 202px;
  /* padding: 0.75rem 1.15rem; */
  list-style-type: none;
  text-align: left;
  border: solid 0.5px gray;

  & span {
    padding: 0 10px;
  }
`;

const SuggestionList = styled.ul.attrs(() => ({
  role: 'listbox',
}))`
  margin: 0;
  padding: 0;
`;
