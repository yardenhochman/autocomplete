import React from 'react';
import { shape, arrayOf, number, string, func, bool } from 'prop-types';
import { whenEnterIsPressed } from './util';
import { SuggestionList, SuggestionItem } from './style';
import ArrowSVG from './icons/arrow';
import { withContext } from '../context';

const Suggestions = ({ results, SuggestionText, selectSuggestion, withArrows, version2 }) => (
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
          {withArrows && <ArrowSVG onClick={selectTerm} />}
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
  withArrows: bool,
  version2: bool,
  results: arrayOf(
    shape({
      resultCount: number,
      term: string,
    }),
  ),
};
