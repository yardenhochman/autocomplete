import React, { useState, useCallback, useEffect } from 'react';
import { bool } from 'prop-types';
import { withContext } from '../context';
import { SearchBar, Page } from './style';
import BoldMatchingText from './SuggestionText';
import useFocusControl from './useFocusControl';
import Suggestions from './Suggestions';
import { fetcher } from './util';

const Search = ({ version2 }) => {
  const [searchText, setSearchText] = useState('');
  const [results, setResults] = useState([]);
  const [showSuggestions, triggerSuggestions] = useState(false);
  const [ref, focusElement] = useFocusControl();

  const fetchSuggestions = React.useCallback(fetcher(setResults), []);

  useEffect(() => {
    console.log(searchText, showSuggestions);

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

  const SuggestionText = useCallback(() => BoldMatchingText(searchText), [results]);
  return (
    <Page>
      <h1>{results}</h1>
      <SearchBar
        onChange={({ target: { value } }) => setSearchText(value)}
        value={searchText}
        onKeyUp={() => triggerSuggestions(true)}
        ref={ref}
        noClear={version2}
      />
      {showSuggestions && (
        <Suggestions {...{ results, SuggestionText, selectSuggestion }} withArrows={version2} />
      )}
    </Page>
  );
};

export default withContext(Search);

Search.propTypes = {
  version2: bool,
};
