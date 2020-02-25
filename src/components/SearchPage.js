import React, { useState, useCallback, useEffect } from 'react';
import { bool } from 'prop-types';
import { withContext } from '../context';
import { SearchBar, Page } from './style';
import BoldMatchingText from './SuggestionText';
import Suggestions from './Suggestions';
import { suggestionFetcher, useFocusControl } from '../utils';

const Search = ({ version2 }) => {
  const [searchText, setSearchText] = useState('');
  const [results, setResults] = useState([]);
  const [showSuggestions, triggerSuggestions] = useState(false);
  const [ref, focusElement] = useFocusControl({ onload: true });

  const fetchSuggestions = React.useCallback(suggestionFetcher(setResults), []);

  useEffect(() => {
    if (showSuggestions && searchText.length > 2) {
      fetchSuggestions(searchText);
    } else {
      setResults([]);
    }
  }, [searchText, fetchSuggestions, showSuggestions]);

  const selectSuggestion = term => {
    setSearchText(term);
    if (!version2) {
      setResults([]);
      triggerSuggestions(false);
    }
    focusElement();
  };

  const SuggestionText = useCallback(() => BoldMatchingText(searchText, results), [
    searchText,
    results,
  ]);
  return (
    <Page>
      <SearchBar
        onChange={({ target: { value } }) => setSearchText(value)}
        value={searchText}
        onKeyUp={() => triggerSuggestions(true)}
        ref={ref}
        noClear={version2}
      />
      {showSuggestions && <Suggestions {...{ results, SuggestionText, selectSuggestion }} />}
    </Page>
  );
};

export default withContext(Search);

Search.propTypes = {
  version2: bool,
};
