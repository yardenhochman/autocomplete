import { debounce } from 'lodash';
import React, { useState, useCallback } from 'react';
import { fetchSearchOptionsAutocomplete, includesText } from './util';
import { SearchBar, Page, SuggestionList } from './style';
import SuggestionItem from './SuggestionItem';

function Search() {
  const [searchText, setSearchText] = useState('');
  const [results, setResults] = useState([]);
  const [showResults, triggerShowResults] = useState(false);

  const fetchSuggestions = useCallback(
    debounce(async value => {
      const {
        data: listOfTermObjects,
      } = await fetchSearchOptionsAutocomplete(value);
      setResults(listOfTermObjects.filter(includesText(value)));
    }, 300),
    [],
  );

  const onChange = async ({ target: { value } }) => {
    setSearchText(value);
    if (value.length <= 2) {
      return setResults([]);
    }
    fetchSuggestions(value);
  };

  const showSuggestions = () => {
    if (results) {
      return triggerShowResults(true);
    }
    triggerShowResults(false);
  };

  const selectSuggestion = term => {
    setSearchText(term);
    triggerShowResults(false);
  };

  return (
    <Page>
      <SearchBar
        onChange={onChange}
        value={searchText}
        onKeyUp={showSuggestions}
      />
      {!!showResults && (
        <SuggestionList>
          {results.map(({ resultCount, term }) => (
            <SuggestionItem
              searchText={searchText}
              key={term}
              resultCount={resultCount}
              text={`${term} (${resultCount})`}
              onClick={() => selectSuggestion(term)}
            />
          ))}
        </SuggestionList>
      )}
    </Page>
  );
}

export default Search;
