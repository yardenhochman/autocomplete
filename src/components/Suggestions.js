import React from 'react';
import { shape, arrayOf, number, string, func, bool } from 'prop-types';
import { whenEnterIsPressed } from '../utils';
import { SuggestionList, SuggestionItem } from './style';
import { ArrowSVG } from '../icons';
import { withContext } from '../context';

const Suggestions = ({ results, SuggestionText, selectSuggestion, version2 }) => (
  <SuggestionList>
    {results.map(({ resultCount, term }) => {
      const Suggest = SuggestionText();
      const selectTerm = () => selectSuggestion(term);
      return (
        <SuggestionItem
          version2={version2}
          key={term}
          onClick={version2 ? selectTerm : undefined}
          onKeyDown={whenEnterIsPressed(selectTerm)}>
          {version2 && <ArrowSVG onClick={selectTerm} />}
          <Suggest suggestion={version2 ? term : `${term} (${resultCount})`} />
        </SuggestionItem>
      );
    })}
  </SuggestionList>
);

export default withContext(Suggestions);

Suggestions.propTypes = {
  SuggestionText: func,
  selectSuggestion: func,
  version2: bool,
  results: arrayOf(
    shape({
      resultCount: number,
      term: string,
    }),
  ),
};
