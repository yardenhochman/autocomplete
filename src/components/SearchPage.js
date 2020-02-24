import React, { useState, useCallback, useEffect } from 'react';
import { SearchBar, Page } from './style';
import BoldMatchingText from './SuggestionText';
import useFocusControl from './useFocusControl';
import Suggestions from './Suggestions';
import { fetcher } from './util';

function Search() {
  const [searchText, setSearchText] = useState('');
  const [results, setResults] = useState([]);
  const [showSuggestions, triggerSuggestions] = useState(false);
  const [ref, focusElement] = useFocusControl();

  const fetchSuggestions = React.useCallback(fetcher(setResults), []);

  useEffect(() => {
    if (searchText.length > 2) {
      fetchSuggestions(searchText);
    } else {
      setResults([]);
    }
  }, [searchText]);

  const setShowSuggestions = () => {
    if (results) {
      return triggerSuggestions(true);
    }
    return triggerSuggestions(false);
  };

  const selectSuggestion = term => {
    setSearchText(term);
    triggerSuggestions(false);
    setResults([]);
    focusElement();
  };

  const SuggestionText = useCallback(() => BoldMatchingText(searchText), [results]);

  return (
    <Page>
      <SearchBar
        onChange={({ target: { value } }) => setSearchText(value)}
        value={searchText}
        onKeyUp={setShowSuggestions}
        ref={ref}
      />
      {showSuggestions && <Suggestions {...{ results, SuggestionText, selectSuggestion }} />}
    </Page>
  );
}

export default Search;
