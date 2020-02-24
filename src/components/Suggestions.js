import React from 'react';
import { shape, arrayOf, number, string, func, bool } from 'prop-types';
import { whenEnterIsPressed } from './util';
import { SuggestionList, SuggestionItem } from './style';
// import Icon from './arrowUp.svg';
import { withContext } from '../context';

const Suggestions = ({ results, SuggestionText, selectSuggestion, withArrows, version2 }) => {
  return (
    <SuggestionList>
      {results.map(({ resultCount, term }) => {
        const Suggest = SuggestionText();
        const suggestionText = version2 ? term : `${term} (${resultCount})`;
        const selectTerm = () => selectSuggestion(term);
        return (
          <SuggestionItem
            version2={version2}
            key={term}
            onClick={version2 ? selectTerm : undefined}
            onKeyDown={whenEnterIsPressed(selectTerm)}>
            {withArrows && <SVG onClick={selectTerm} />}
            <Suggest suggestion={suggestionText} />
          </SuggestionItem>
        );
      })}
    </SuggestionList>
  );
};

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

const SVG = () => (
  <svg
    id="Capa_1"
    enableBackground="new 0 0 320.941 320.941"
    height="20"
    viewBox="0 0 320.941 320.941"
    xmlns="http://www.w3.org/2000/svg">
    <path d="m230.676 320.941h-140.411c-5.544 0-10.029-4.486-10.029-10.029v-60.176c0-5.544 4.486-10.029 10.029-10.029h140.412c5.544 0 10.029 4.486 10.029 10.029v60.176c0 5.543-4.486 10.029-10.03 10.029zm-130.382-20.059h120.353v-40.118h-120.353z" />
    <path d="m230.676 220.647h-140.411c-5.544 0-10.029-4.486-10.029-10.029v-70.206h-30.089c-3.976 0-7.581-2.351-9.177-5.994-1.606-3.634-.901-7.875 1.783-10.813l110.293-120.353c1.908-2.075 4.669-3.257 7.427-3.252 2.737.006 5.47 1.183 7.363 3.252l110.353 120.353c2.684 2.929 3.389 7.179 1.783 10.813-1.596 3.644-5.201 5.994-9.177 5.994h-30.088v70.206c-.001 5.543-4.487 10.029-10.031 10.029zm-130.382-20.059h120.353v-70.206c0-5.544 4.486-10.029 10.029-10.029h17.316l-87.552-95.485-87.503 95.485h17.326c5.544 0 10.029 4.486 10.029 10.029.002 0 .002 70.206.002 70.206z" />
  </svg>
);
