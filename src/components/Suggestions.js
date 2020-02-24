import React from 'react';
import { shape, arrayOf, number, string, func } from 'prop-types';
import { whenEnterIsPressed } from './util';
import { SuggestionList, SuggestionItem } from './style';

const Suggestions = ({ results, SuggestionText, selectSuggestion }) => {
  return (
    <SuggestionList>
      {results.map(({ resultCount, term }) => {
        const Suggest = SuggestionText();
        const suggestionText = `${term} (${resultCount})`;
        const selectTerm = () => selectSuggestion(suggestionText);
        return (
          <SuggestionItem
            key={term}
            onClick={selectTerm}
            onKeyDown={whenEnterIsPressed(selectTerm)}>
            <Suggest suggestion={suggestionText} />
          </SuggestionItem>
        );
      })}
    </SuggestionList>
  );
};

export default Suggestions;

Suggestions.propTypes = {
  SuggestionText: func,
  selectSuggestion: func,
  results: arrayOf(
    shape({
      resultCount: number,
      term: string,
    }),
  ),
};
