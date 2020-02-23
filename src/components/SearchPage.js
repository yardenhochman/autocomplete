import { debounce } from 'lodash';
import React, { useState, useCallback, useEffect, useRef } from 'react';
import {
  fetchSearchOptionsAutocomplete,
  includesText,
  whenEnterIsPressed,
} from './util';
import { SearchBar, Page, SuggestionList, Suggestion } from './style';
import BoldMatchingText from './SuggestionText';

function Search() {
  const [searchText, setSearchText] = useState('');
  const [results, setResults] = useState([]);
  const [showResults, triggerShowResults] = useState(false);

  const searchRef = useRef();

  const focusSearch = () => searchRef.current && searchRef.current.focus();

  useEffect(() => {
    focusSearch();
  }, []);

  const fetchSuggestions = useCallback(
    debounce(async value => {
      const { data: listOfTermObjects } = await fetchSearchOptionsAutocomplete(
        value,
      );
      setResults(listOfTermObjects.filter(includesText(value)));
    }, 300),
    [],
  );

  const onChange = ({ target: { value } }) => {
    setSearchText(value);
    if (value.length <= 2) {
      return setResults([]);
    }
    return fetchSuggestions(value);
  };

  const showSuggestions = () => {
    if (results) {
      return triggerShowResults(true);
    }
    return triggerShowResults(false);
  };

  const selectSuggestion = term => {
    setSearchText(term);
    triggerShowResults(false);
    setResults([]);
    focusSearch();
  };

  const SuggestionText = BoldMatchingText(searchText);

  return (
    <Page>
      <SearchBar
        onChange={onChange}
        value={searchText}
        onKeyUp={showSuggestions}
        ref={searchRef}
      />
      {showResults && (
        <SuggestionList>
          {results.map(({ resultCount, term }) => {
            const selectTerm = () =>
              selectSuggestion(`${term} (${resultCount})`);
            return (
              <Suggestion
                key={term}
                searchText={searchText}
                onClick={selectTerm}
                onKeyDown={whenEnterIsPressed(selectTerm)}>
                <SuggestionText suggestion={`${term} (${resultCount})`} />
              </Suggestion>
            );
          })}
        </SuggestionList>
      )}
    </Page>
  );
}

export default Search;
